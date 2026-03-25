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
        { key: "users.read", name: "Ver Usuarios", description: "Permite ver el apartado de usuarios" },
        { key: "users.create", name: "Crear Usuarios", description: "Permite crear usuarios" },
        { key: "users.update", name: "Actualizar Usuarios", description: "Permite actualizar usuarios" },
        { key: "users.delete", name: "Eliminar Usuarios", description: "Permite eliminar usuarios" },

        // Roles
        { key: "roles.read", name: "Ver Roles", description: "Permite ver la lista de roles" },
        { key: "roles.create", name: "Crear Roles", description: "Permite crear nuevos roles" },
        { key: "roles.update", name: "Actualizar Roles", description: "Permite actualizar roles" },
        { key: "roles.delete", name: "Eliminar Roles", description: "Permite eliminar roles" },

        // Permisos
        { key: "permissions.read", name: "Ver Permisos", description: "Permite ver la lista de permisos" },
        { key: "permissions.create", name: "Crear Permiso", description: "Permite crear un nuevo permiso" },
        { key: "permissions.update", name: "Actualizar Permiso", description: "Permite actualizar un permiso ya existente" },
        { key: "permissions.delete", name: "Eliminar Permiso", description: "Permite eliminar un permiso existente" },

        // settings
        { key: "settings.update", name: "Actualizar Configuraciones", description: "Permite actualizar las configuraciones" },

        // Inicio
        { key: "alert.update", name: "Actualizar Alerta", description: "Permite actualizar la alerta de inicio" },

        { key: "carousel.create", name: "Crear Carrusel", description: "Permite crear un nuevo carrusel en el inicio" },
        { key: "carousel.update", name: "Actualizar Carrusel", description: "Permite actualizar un carrusel existente en el inicio" },
        { key: "carousel.delete", name: "Eliminar Carrusel", description: "Permite eliminar un carrusel existente en el inicio" },

        { key: "calendar.update", name: "Actualizar Primera Sección", description: "Permite actualizar la primera sección de inicio" },
        { key: "derechohabiencia.update", name: "Actualizar Segunda Sección", description: "Permite actualizar la segunda sección de inicio" },

        { key: "quickaccess.create", name: "Crear Acceso Rápido", description: "Permite crear un nuevo acceso rápido en el inicio" },
        { key: "quickaccess.update", name: "Actualizar Acceso Rápido", description: "Permite actualizar un acceso rápido existente en el inicio" },
        { key: "quickaccess.delete", name: "Eliminar Acceso Rápido", description: "Permite eliminar un acceso rápido existente en el inicio" },

        // Sistemas de consulta
        { key: "system.create", name: "Crear Sistema", description: "Permite crear un nuevo sistema" },
        { key: "system.update", name: "Actualizar Sistema", description: "Permite actualizar un sistema existente" },
        { key: "system.delete", name: "Eliminar Sistema", description: "Permite eliminar un sistema existente" },

        // CIE10
        { key: "cie10.create", name: "Crear Enfermedad", description: "Permite crear una nueva enfermedad dentro de la clasificación internacional de enfermedades (CIE-10)" },
        { key: "cie10.update", name: "Actualizar Enfermedad", description: "Permite actualizar una enfermedad existente dentro de la clasificación internacional de enfermedades (CIE-10)" },
        { key: "cie10.delete", name: "Eliminar Enfermedad", description: "Permite eliminar una enfermedad existente dentro de la clasificación internacional de enfermedades (CIE-10)" },

        // Informes Mensuales
        { key: "monthlyreports.create", name: "Crear Informe Mensual", description: "Permite crear un nuevo informe mensual" },
        { key: "monthlyreports.update", name: "Actualizar Informe Mensual", description: "Permite actualizar un informe mensual existente" },
        { key: "monthlyreports.delete", name: "Eliminar Informe Mensual", description: "Permite eliminar un informe mensual existente" },

        // Personas de convenio
        { key: "agreementperson.read", name: "Ver Personas de Convenio", description: "Permite ver la lista de personas de convenio" },
        { key: "agreementperson.create", name: "Crear Persona de Convenio", description: "Permite crear una nueva persona de convenio" },
        { key: "agreementperson.update", name: "Actualizar Persona de Convenio", description: "Permite actualizar una persona de convenio" },
        { key: "agreementperson.delete", name: "Eliminar Persona", description: "Permite eliminar una persona de convenio existente" },

        // Cuadro Basico Integral de Medicamentos
        { key: "cbim.create", name: "Crear Medicamento", description: "Permite crear un nuevo medicamento dentro del Cuadro Básico Integral de Medicamentos (CBIM)" },
        { key: "cbim.update", name: "Actualizar Medicamento", description: "Permite actualizar un medicamento existente dentro del Cuadro Básico Integral de Medicamentos (CBIM)" },
        { key: "cbim.delete", name: "Eliminar Medicamento", description: "Permite eliminar un medicamento existente dentro del Cuadro Básico Integral de Medicamentos (CBIM)" },

        // Guías de Práctica Clínica
        { key: "gpccenetc.create", name: "Crear Guía de Práctica Clínica", description: "Permite crear un nueva nueva Guía de Práctica Clínica" },
        { key: "gpccenetc.update", name: "Actualizar Guía de Práctica Clínica", description: "Permite actualizar una Guía de Práctica Clínica existente" },
        { key: "gpccenetc.delete", name: "Eliminar Guía de Práctica Clínica", description: "Permite eliminar una Guías de Práctica Clínica existente" },

        // Algoritmos PBM
        { key: "pbm.create", name: "Crear Algoritmo PBM", description: "Permite crear un nuevo Algoritmo PBM" },
        { key: "pbm.update", name: "Actualizar Algoritmo PBM", description: "Permite actualizar un Algoritmo PBM existente" },
        { key: "pbm.delete", name: "Eliminar Algoritmo PBM", description: "Permite eliminar un Algoritmo PBM existente" },

        // Algoritmos GPC
        { key: "gpc.create", name: "Crear Algoritmo GPC", description: "Permite crear un nuevo Algoritmo GPC" },
        { key: "gpc.update", name: "Actualizar Algoritmo GPC", description: "Permite actualizar un Algoritmo GPC existente" },
        { key: "gpc.delete", name: "Eliminar Algoritmo GPC", description: "Permite eliminar un Algoritmo GPC existente" },

        // Algoritmos GPC
        { key: "protocols.create", name: "Crear Protocolo de Atención (Pediatría)", description: "Permite crear un nuevo Protocolo de Atención (Pediatría)" },
        { key: "protocols.update", name: "Actualizar Protocolo de Atención (Pediatría)", description: "Permite actualizar un Protocolo de Atención (Pediatría) existente" },
        { key: "protocols.delete", name: "Eliminar Protocolo de Atención (Pediatría)", description: "Permite eliminar un Protocolo de Atención (Pediatría) existente" },

        // Eventos Adversos
        { key: "events.create", name: "Crear Evento Adverso", description: "Permite crear un nuevo Evento Adverso" },
        { key: "events.update", name: "Actualizar Evento Adverso", description: "Permite actualizar un Evento Adverso existente" },

        // Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH)
        { key: "uveh.create", name: "Crear Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH)", description: "Permite crear una nueva Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH)" },
        { key: "uveh.update", name: "Actualizar Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH)", description: "Permite actualizar una Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH) existente" },
        { key: "uveh.delete", name: "Eliminar Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH)", description: "Permite eliminar una Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH) existente" },

        // Normas Oficiales
        { key: "standards.create", name: "Crear Norma Oficial Mexicana", description: "Permite crear una nueva Norma Oficial Mexicana" },
        { key: "standards.update", name: "Actualizar Norma Oficial Mexicana", description: "Permite actualizar una Norma Oficial Mexicana existente" },
        { key: "standards.delete", name: "Eliminar Norma Oficial Mexicana", description: "Permite eliminar una Norma Oficial Mexicana existente" },
    
        // Macroproceso 
        { key: "macroprocessarea.update", name: "Actualizar Área de Macroproceso", description: "Permite actualizar un área existente dentro del macroproceso" },
        { key: "macroprocesstype.update", name: "Actualizar Tipo de Manual de Macroproceso", description: "Permite actualizar un tipo de manual existente dentro del macroproceso" },
        { key: "macroprocess.update", name: "Actualizar Manual de Macroproceso", description: "Permite actualizar un manual existente dentro del macroproceso" },
        { key: "macroprocess.delete", name: "Eliminar Manual de Macroproceso", description: "Permite eliminar un manual existente dentro del macroproceso" },

    ]

    const permissionRecords = []

    for (const p of permissions) {

        const permission = await prisma.permission.upsert({
            where: { key: p.key },
            update: {},
            create: {
                key: p.key,
                name: p.name,
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