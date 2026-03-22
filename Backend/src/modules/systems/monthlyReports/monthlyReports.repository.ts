import { database } from "../../../config/prisma";
import { logger } from "../../../utils/logger";

////////////
// CREATE //
////////////

interface PostMonthlyReportsRepositoryProps {
    title: string;
    description?: string | null;
    type: "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA";
    fileName?: string | null;
    filePath?: string | null;
    fileSize?: number | null;
    mimeType?: string | null;
    month?: number | null;
    year: number;
}

export const postMonthlyReportsRepository = async (props: PostMonthlyReportsRepositoryProps) => {
    try {
        await database.report.create({
            data: {
                ...props,
                period: {
                    connectOrCreate: {
                        where: { year: props.year },
                        create: { year: props.year }
                    }
                }
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postMonthlyReportsRepository",
                entity: "Report",
                input: props
            },
            "Error al crear informe mensual"
        )
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
            ...(year && { period: { year } }),
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
                orderBy: { month: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: { period: true }
            }),
            database.report.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getMonthlyReportsRepository",
                entity: "Report",
                params: { search, take, skip, year }
            },
            "Error al obtener reportes mensuales"
        )
        throw new Error("Error al obtener reportes mensuales")
    }
}

export const getPeriodsRepository = async () => {
    try {
        return await database.period.findMany({
            where: {
                reports: { some: {} },
            },
            select: {
                id: true,
                year: true,
                _count: {
                    select: { reports: true },
                },
            },
        });
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getPeriodsRepository",
                entity: "Period"
            },
            "Error al obtener periodos"
        )
        throw new Error("Error al obtener periodos")
    }
}

export const getMonthlyReportByIdRepository = async (id: string) => {
    try {
        return await database.report.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getMonthlyReportByIdRepository",
                entity: "Report",
                id
            },
            "Error al obtener reporte"
        )
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

export const putMonthlyReportRepository = async (props: PutMonthlyReportsRepositoryProps) => {
    try {
        const { id, year, ...rest } = props

        return await database.report.update({
            where: { id },
            data: {
                ...rest,
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
        logger.error(
            {
                error,
                operation: "putMonthlyReportRepository",
                entity: "Report",
                input: props
            },
            "Error al actualizar informe"
        )
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
        logger.error(
            {
                error,
                operation: "deleteMonthlyReportRepository",
                entity: "Report",
                id
            },
            "Error al eliminar reporte"
        )
        throw new Error("Error al eliminar reporte")
    }
}