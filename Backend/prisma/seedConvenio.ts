import { PrismaClient, PersonType } from "@prisma/client";
import { adapter } from "../src/config/prisma";
import "dotenv/config";
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({ adapter });

async function main() {
    const filePath = path.join(__dirname, './data/convenio/convenio.json');
    const rawData: any[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    console.log('🚀 Iniciando Seed Jerárquico...');

    // --- 1. Sincronizar Catálogos ---
    const zones = Array.from(new Set(rawData.map(d => String(d.zona).trim())));
    const groups = Array.from(new Set(rawData.map(d => String(d.grupo).trim())));

    for (const zone of zones) {
        await prisma.zone.upsert({ where: { name: zone }, update: {}, create: { name: zone } });
    }
    for (const group of groups) {
        await prisma.group.upsert({ where: { name: group }, update: {}, create: { name: group } });
    }

    const dbZones = await prisma.zone.findMany();
    const dbGroups = await prisma.group.findMany();

    // --- 2. Procesar Personas y asignar PersonType ---
    const personasUnicas = new Map<number, any>();

    rawData.forEach(item => {
        const cveDep = String(item.cve_dep).trim();
        const numPer = String(item.num_per).trim();

        // Lógica de ID: Si cve_dep es 0, es el ID del titular. Si no, es el ID del dependiente.
        const id = cveDep === "0" ? parseInt(numPer) : parseInt(cveDep);

        // Determinamos el tipo basado en la clave de dependencia
        const type: PersonType = cveDep === "0" ? PersonType.HOLDER : PersonType.DEPENDENT;

        if (!personasUnicas.has(id)) {
            personasUnicas.set(id, { ...item, calculatedType: type });
        } else if (type === PersonType.HOLDER) {
            // Si por alguna razón el titular aparece después como registro, 
            // nos aseguramos de que prevalezca su estado de HOLDER
            personasUnicas.set(id, { ...item, calculatedType: type });
        }
    });

    console.log(`👥 Insertando ${personasUnicas.size} personas...`);

    const listaPersonas = Array.from(personasUnicas.entries());

    for (const [id, item] of listaPersonas) {
        const zId = dbZones.find(z => z.name === String(item.zona).trim())?.id || 0;
        const gId = dbGroups.find(g => g.name === String(item.grupo).trim())?.id || 0;

        await prisma.agreementPerson.upsert({
            where: { id },
            update: {
                name: item.nombre,
                zoneId: zId,
                groupId: gId,
                type: item.calculatedType // Guardamos el tipo calculado
            },
            create: {
                id,
                name: item.nombre,
                zoneId: zId,
                groupId: gId,
                type: item.calculatedType
            }
        });
    }

    // --- 3. Crear Vínculos Familiares ---
    console.log('🔗 Vinculando familias...');

    let vinculosExitosos = 0;
    // Solo procesamos los que en el JSON original tienen un titular asignado (cve_dep != 0)
    const dependientesRaw = rawData.filter(item => String(item.cve_dep).trim() !== "0");

    for (const item of dependientesRaw) {
        const dependentId = parseInt(item.cve_dep);
        const parentId = parseInt(item.num_per);

        try {
            // Verificamos que ambos existan antes de vincular para evitar errores de FK
            await prisma.familyLink.upsert({
                where: {
                    parentId_dependentId: { parentId, dependentId }
                },
                update: {},
                create: { parentId, dependentId }
            });
            vinculosExitosos++;
        } catch (error) {
            console.error(`❌ No se pudo vincular: Padre ${parentId} -> Hijo ${dependentId}`);
        }
    }

    console.log('\n✨ --- Resultados Finales ---');
    console.log('✅ Personas procesadas: ' + personasUnicas.size);
    console.log('🔗 Vínculos jerárquicos: ' + vinculosExitosos);
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());