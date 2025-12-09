import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Ejemplo: páginas iniciales del blog
    // const menu = JSON.stringify([{
    //     id: 'Home',
    //     children: [],
    // },
    // {
    //     id: 'Collections',
    //     children: [
    //         { id: 'Spring', children: [] },
    //         { id: 'Summer', children: [] },
    //         { id: 'Fall', children: [] },
    //         { id: 'Winter', children: [] },
    //     ],
    // },
    // {
    //     id: 'My Account',
    //     children: [
    //         { id: 'Addresses', children: [] },
    //         { id: 'Order History', children: [] },
    //     ],
    // },])


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
        {id: 1, title: "Primer apartado", content: "Hola"},
        {id: 2, title: "Segundo apartado", content: "Hola"},
        {id: 3, title: "Tercer apartado", content: "Hola"},
        {id: 4, title: "Cuarto apartado", content: "Hola"},
        {id: 5, title: "Quinto apartado", content: "Hola"},
    ]

    for (const section of sections) {
        await prisma.sectionHome.upsert({
            where: {id: section.id},
            update: {},
            create: {
                id: section.id,
                title: section.title,
                content: section.content
            }
        })
    }

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