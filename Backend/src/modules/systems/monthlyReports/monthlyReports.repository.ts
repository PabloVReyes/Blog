import { database } from "@/config/prisma";

////////////
// CREATE //
////////////

interface PostMonthlyReportsRepositoryProps {
    title: string;
    description: string;
    type: "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA";
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    month?: number;
    year: number;
}

export const postMonthlyReportsRepository = async ({
    title,
    description,
    type,
    fileName,
    filePath,
    fileSize,
    mimeType,
    month,
    year
}: PostMonthlyReportsRepositoryProps) => {
    try {
        await database.report.create({
            data: {
                title,
                description,
                type,
                fileName,
                filePath,
                fileSize,
                mimeType,
                month,
                period: {
                    connectOrCreate: {
                        where: { year },
                        create: { year }
                    }
                }
            }
        })
    } catch (error) {
        console.error("error en postMonthlyReportsRepository", error)
        throw new Error("Error al crear informe mensual")
    }
}

//////////
// READ //
//////////

interface GetMonthlyReportsRepositoryProps {
    search?: string;
    take?: number;
    skip?: number;
    year?: number;
}

export const getMonthlyReportsRepository = async ({ search, take, skip, year }: GetMonthlyReportsRepositoryProps) => {
    try {
        const where = {
            ...(year && {
                period: { year }
            }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.report.findMany({
                where,
                orderBy: {
                    month: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    period: true
                }
            }),
            database.report.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("error en getMonthlyReports", error)
        throw new Error("Error al obtener reportes mensuales")
    }
}

export const getPeriodsRepository = async () => {
    try {
        return await database.period.findMany({
            where: {
                reports: {
                    some: {},
                },
            },
            select: {
                id: true,
                year: true,
                _count: {
                    select: {
                        reports: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error en getPeriodsRepository", error)
        throw new Error("Error al obtener periodos")
    }
}

export const getMonthlyReportByIdRepository = async (id: string) => {
    try {
        return await database.report.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getMonthlyReportById", error)
        throw new Error("Error al obtener reporte")
    }
}

////////////
// UPDATE //
////////////

interface PutMonthlyReportsRepositoryProps {
    id: string;
    title: string;
    description: string;
    type: "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA";
    fileName?: string;
    filePath?: string;
    fileSize?: number;
    mimeType: string;
    month?: number;
    year: number;
}


export const putMonthlyReportRepository = async ({ id, title, description, type, fileName, filePath, fileSize, mimeType, month, year }: PutMonthlyReportsRepositoryProps) => {
    try {
        return await database.report.update({
            where: { id },
            data: {
                title,
                description,
                type,
                fileName,
                filePath,
                fileSize,
                mimeType,
                month,
                period: {
                    connectOrCreate: {
                        where: { year },
                        create: { year }
                    }
                }
            },
            include: {
                period: true
            }
        })
    } catch (error) {
        console.error("error en putMonthlyReportRepository", error)
        throw new Error("Error al actualizar informe")
    }
}

////////////
// DELETE //
////////////

export const deleteMonthlyReportRepository = async (id: string) => {
    try {
        return await database.report.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteMonthlyReportRepository", error)
        throw new Error("Error al eliminar reporte")
    }
}