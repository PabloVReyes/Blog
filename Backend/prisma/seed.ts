import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const settings = [
        { name: "title", value: "Blog" },
        { name: "color", value: "red" },
        { name: "theme", value: "auto" },
        { name: "favicon", value: "" },
        // { name: "menu", value: menu }
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { name: setting.name },
            update: {},
            create: {
                name: setting.name,
                value: setting.value
            },
        });
    }

    const sections = [
        { id: 1, title: "Primer apartado", content: "Hola" },
        { id: 2, title: "Segundo apartado", content: "Hola" },
        { id: 3, title: "Tercer apartado", content: "Hola" },
        { id: 4, title: "Cuarto apartado", content: "Hola" },
        { id: 5, title: "Quinto apartado", content: "Hola" },
    ]

    for (const section of sections) {
        await prisma.sectionHome.upsert({
            where: { id: section.id },
            update: {},
            create: {
                id: section.id,
                title: section.title,
                content: section.content
            }
        })
    }


    const filePath = path.join(__dirname, 'sistemas.json'); // si está en la misma carpeta que seed_ext.ts
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const item of data) {
        await prisma.systems.create({
            data: {
                name: item.name,
                description: item.description,
                color: item.color,
                icon: item.icon,
                url: item.url,
            },
        });
    }

    console.log('✅ Todas los sistemas cargadas correctamente');

    const filePathExtensions = path.join(__dirname, 'extensiones.json'); // si está en la misma carpeta que seed_ext.ts
    const dataExtensions = JSON.parse(fs.readFileSync(filePathExtensions, 'utf8'));

    for (const item of dataExtensions) {
        await prisma.ditectory.create({
            data: {
                name: item.nombre,
                phone: item.extension,
                level: item.piso,
                boss: item.jefe || null,
                secretary: item.secretarias || null,
                email: item.email || null,
            },
        });
    }

    console.log('✅ Todas las extensiones cargadas correctamente');

    console.log("Seeding finished!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });