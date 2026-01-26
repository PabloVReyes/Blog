import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from 'fs';
import path from "path";

async function main() {
    const filePath = path.join(__dirname, 'extensiones.json'); // si está en la misma carpeta que seed_ext.ts
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const item of data) {
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
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
