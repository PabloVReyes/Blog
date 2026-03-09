import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import prompts from "prompts"
import { adapter } from "../src/config/prisma"

const prisma = new PrismaClient({ adapter })

async function main() {

    console.log("\n🚀 Inicializando base de datos\n")

    /*
    =============================
    PERMISOS
    =============================
    */

    const permissions = [
        { key: "users.read", description: "Ver usuarios" },
        { key: "users.create", description: "Crear usuarios" },
        { key: "users.update", description: "Actualizar usuarios" },
        { key: "users.delete", description: "Eliminar usuarios" },

        { key: "roles.read", description: "Ver roles" },
        { key: "roles.create", description: "Crear roles" },
        { key: "roles.update", description: "Actualizar roles" },
        { key: "roles.delete", description: "Eliminar roles" }
    ]

    const permissionRecords = []

    for (const p of permissions) {

        const permission = await prisma.permission.upsert({
            where: { key: p.key },
            update: {},
            create: {
                key: p.key,
                description: p.description
            }
        })

        permissionRecords.push(permission)
    }

    /*
    =============================
    ROLES
    =============================
    */

    const adminRole = await prisma.role.upsert({
        where: { name: "ADMIN" },
        update: {},
        create: {
            name: "ADMIN",
            description: "Administrador del sistema"
        }
    })

    const userRole = await prisma.role.upsert({
        where: { name: "USER" },
        update: {},
        create: {
            name: "USER",
            description: "Usuario estándar"
        }
    })

    /*
    =============================
    PERMISOS PARA ADMIN
    =============================
    */

    for (const permission of permissionRecords) {

        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: adminRole.id,
                    permissionId: permission.id
                }
            },
            update: {},
            create: {
                roleId: adminRole.id,
                permissionId: permission.id
            }
        })

    }

    /*
    =============================
    CREAR ADMIN
    =============================
    */

    console.log("\n👑 Crear usuario administrador\n")

    const response = await prompts([
        {
            type: "text",
            name: "email",
            message: "Correo del administrador:",
            validate: (value) =>
                value.includes("@") ? true : "Correo inválido"
        },
        {
            type: "password",
            name: "password",
            message: "Contraseña:",
            validate: (value) =>
                value.length >= 6 ? true : "Mínimo 6 caracteres"
        },
        {
            type: "password",
            name: "confirmPassword",
            message: "Confirmar contraseña:"
        }
    ])

    if (response.password !== response.confirmPassword) {
        console.log("❌ Las contraseñas no coinciden")
        process.exit(1)
    }

    const existing = await prisma.user.findUnique({
        where: { email: response.email }
    })

    if (existing) {
        console.log("⚠️ Ya existe un usuario con ese correo")
        return
    }

    const hash = await bcrypt.hash(response.password, 10)

    const user = await prisma.user.create({
        data: {
            name: "Administrador",
            email: response.email,
            password: hash
        }
    })

    await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: adminRole.id
        }
    })

    console.log("\n✅ Administrador creado correctamente\n")

}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })