import { PrismaClient } from "@prisma/client";
import { adapter } from "../src/config/prisma"
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding database...");


    const filePath = path.join(__dirname, './data/downloadAreas.json'); // si está en la misma carpeta que seed_ext.ts
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const item of data) {
        const slug = slugify(item.name, { lower: true, strict: true })
        await prisma.downloadArea.create({
            data: {
                name: item.name,
                icon: item.icon,
                color: item.color,
                slug: slug
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