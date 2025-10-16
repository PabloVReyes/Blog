import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Ejemplo: páginas iniciales del blog
    const menu = JSON.stringify([{
        id: 'Home',
        children: [],
    },
    {
        id: 'Collections',
        children: [
            { id: 'Spring', children: [] },
            { id: 'Summer', children: [] },
            { id: 'Fall', children: [] },
            { id: 'Winter', children: [] },
        ],
    },
    {
        id: 'My Account',
        children: [
            { id: 'Addresses', children: [] },
            { id: 'Order History', children: [] },
        ],
    },])


    const settings = [
        { name: "title", value: "Blog" },
        { name: "color", value: "green" },
        { name: "theme", value: "auto" },
        { name: "favicon", value: "" },
        { name: "menu", value: menu }
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