import { PrismaClient } from "@prisma/client";
import { adapter } from "../src/config/prisma"
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding database...");


    const filePath = path.join(__dirname, './data/cbim.json'); // si está en la misma carpeta que seed_ext.ts
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const item of data) {
        await prisma.cbim.create({
            data: {
                code: item.clave_med,
                name: item.medicamento,
                description: item.presentacion,
                sp: item.sp,
                fpgc: item.fpgc,
                cbt_cae: item.cbt_cae
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