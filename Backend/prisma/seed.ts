import { PrismaClient } from "@prisma/client";
import { adapter } from "../src/config/prisma"
import "dotenv/config";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding database...");

    const settings = [
        { name: "title", value: "Blog" },
        { name: "color", value: "custom1" },
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

    const filePath = path.join(__dirname, './data/sistemas.json'); // si está en la misma carpeta que seed_ext.ts
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const item of data) {
        await prisma.systems.create({
            data: {
                acronym: item.acronym,
                name: item.name,
                description: item.description,
                color: item.color,
                icon: item.icon,
                url: item.url,
            },
        });
    }


    console.log('✅ Todas los sistemas cargadas correctamente');

    // Inicio
    await prisma.homeSection.create({
        data: {
            key: "alert",
            type: "ALERT",
            title: "Alerta",
            orderIndex: 0,
            alert: {
                create: {
                    icon: "IconHandLoveYou",
                    color: "emerald",
                    title: "¡Bienvenido al sistema renovado!",
                    description:
                        "Hemos evolucionado nuestra plataforma para ofrecerte un entorno más moderno, ágil y funcional, manteniendo todo lo que ya conoces y agregando nuevas mejoras pensadas para ti.",
                    author: "Pablo Vazquez Reyes",
                    isActive: true,
                },
            },
        },
    });

    console.log('✅ Alert');

    await prisma.homeSection.create({
        data: {
            key: "carousel",
            type: "CAROUSEL",
            orderIndex: 1,
            title: "Carrusel"
        },
    });

    console.log('✅ Carousel');

    await prisma.homeSection.create({
        data: {
            key: "calendar",
            type: "CALENDAR",
            title: "Calendario",
            orderIndex: 2,
            calendar: {
                create: {
                    color: "green",
                    icon: "IconCalendarWeek",
                    year: 2025,
                    title: "Calendario de Comités Intrahospitalarios",
                    description: "Consulta fechas importantes",
                },
            },
        },
    });

    console.log('✅ Calendario');

    await prisma.homeSection.create({
        data: {
            key: "derechohambiencia",
            type: "DERECHOHABIENCIA",
            title: "Derechohabiencia",
            orderIndex: 3,
            derechoambiencia: {
                create: {
                    color: "blue",
                    icon: "IconSearch",
                    title: "Consulta Derechohabiencia",
                    description: "Verifica el estatus de afiliación",
                    links: {
                        create: [
                            {
                                title: "IMSS Digital",
                                url: "https://www.imss.gob.mx/constancia-no-derechohabiencia",
                                orderIndex: 0,
                            },
                            {
                                title: "ISSSTE",
                                url: "https://oficinavirtual.issste.gob.mx/Servicios/Acreditaci%C3%B3n-de-no-Afiliaci%C3%B3n",
                                orderIndex: 1,
                            },
                            {
                                title: "CURP",
                                url: "https://www.gob.mx/curp/",
                                orderIndex: 2,
                            },
                        ]
                    }
                }
            },
        },
    });

    console.log('✅ Derechohabiencia');

    await prisma.homeSection.create({
        data: {
            key: "accesscard",
            type: "ACCESS_CARD",
            title: "Accesos Directos",
            orderIndex: 4,
            accessCards: {
                create: [
                    {
                        icon: "IconPhone",
                        title: "Sistema Escolar",
                        url: "https://sistema.escolar.mx",
                        color: "green",
                        description: "Información y procedimientos",
                        type: "page",
                        orderIndex: 0,
                    },
                    {
                        icon: "IconDna2",
                        title: "Correo Institucional",
                        url: "https://correo.institucional.mx",
                        description: "Información y procedimientos",
                        color: "blue.5",
                        type: "page",
                        orderIndex: 1,
                    },
                ],
            },
        },
    });

    console.log('✅ Access Card');

    const filePathExtensions = path.join(__dirname, './data/extensiones.json'); // si está en la misma carpeta que seed_ext.ts
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

    // Macroproceso
    // Tipos de manuales
    const filePathManualType = path.join(__dirname, './data/manual_types.json'); // si está en la misma carpeta que seed_ext.ts
    const dataManualType = JSON.parse(fs.readFileSync(filePathManualType, 'utf8'));

    for (const item of dataManualType) {
        await prisma.manualType.create({
            data: {
                id: item.id,
                name: item.name,
                color: item.color,
                category: item.category
            },
        });
    }

    console.log('✅ Todos los tipos de manuales cargados correctamente');

    // Areas
    const filePathArea = path.join(__dirname, './data/areas.json'); // si está en la misma carpeta que seed_ext.ts
    const dataArea = JSON.parse(fs.readFileSync(filePathArea, 'utf8'));

    for (const item of dataArea) {
        await prisma.area.create({
            data: {
                id: item.id,
                name: item.name,
                category: item.category,
                description: item.description,
                manager: item.manager
            }
        })
    }

    console.log('✅ Todas las areas cargadas correctamente');

    const filePathManuals = path.join(__dirname, './data/manuals.json'); // si está en la misma carpeta que seed_ext.ts
    const dataManuals = JSON.parse(fs.readFileSync(filePathManuals, 'utf8'));

    for (const item of dataManuals) {
        await prisma.manual.create({
            data: {
                areaId: item.areaId,
                manualTypeId: item.manualTypeId
            }
        })
    }

    console.log('✅ Todas los manuales cargadas correctamente');

    const filePathCie10 = path.join(__dirname, './data/cie10.json'); // si está en la misma carpeta que seed_ext.ts
    const dataCie10 = JSON.parse(fs.readFileSync(filePathCie10, 'utf8'));

    for (const item of dataCie10) {
        await prisma.cie10.create({
            data: {
                id: item.id,
                name: item.name,
            }
        })
    }

    console.log('✅ Sistema CIE-10 cargado');

    const fileCodes = path.join(__dirname, './data/codigos.json'); // si está en la misma carpeta que seed_ext.ts
    const dataCodes = JSON.parse(fs.readFileSync(fileCodes, 'utf8'));

    for (const item of dataCodes) {
        await prisma.codes.create({
            data: {
                code: item.codigo,
                color: item.color,
                name: item.nombre,
                description: item.descripcion,
                category: {
                    connectOrCreate: {
                        where: { name: item.categoria },
                        create: { name: item.categoria }
                    }
                },
                icon: item.icono
            }
        })
    }

    console.log('✅ Codigos');

    await prisma.adverseEvents.create({
        data: {
            title: "Reporte en Línea",
            type: "qr"
        }
    })

    await prisma.adverseEvents.create({
        data: {
            title: "Formato Físico",
            type: "file"
        }
    })

    console.log('✅ Eventos Adversos');


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