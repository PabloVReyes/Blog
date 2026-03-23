import { database } from "../../../config/prisma";
import { logger } from "../../../utils/logger";
import * as path from "path"
import * as fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostMonthlyReportsRepositoryProps {
    title: string;
    description?: string | null;
    type: "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA";
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
    month?: number | null;
    year: number;
}

export const postMonthlyReportsRepository = async ({ title, description, type, file, month, year }: PostMonthlyReportsRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            const period = await tx.period.upsert({
                where: { year },
                update: {},
                create: { year }
            })

            return await tx.report.create({
                data: {
                    title,
                    description,
                    type,
                    fileId,
                    month,
                    periodId: period.id
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postMonthlyReportsRepository",
                entity: "Report",
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
                include: {
                    period: true,
                    file: true
                }
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
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
    month?: number;
    year: number;
}

export const putMonthlyReportRepository = async ({ id, title, description, type, file, month, year }: PutMonthlyReportsRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.report.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Reporte no encontrado")
            }

            let fileId = current.fileId
            const uploadsPath = path.join(process.cwd(), 'uploads');

            if (file) {
                if (current.file?.path) {
                    try {
                        const absolutePath = path.join(uploadsPath, current.file.path)
                        await fs.unlink(absolutePath)
                    } catch (_) { }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    })
                }

                const newFile = await tx.file.create({
                    data: file
                })

                fileId = newFile.id
            }

            const period = await tx.period.upsert({
                where: { year },
                update: {},
                create: { year }
            })

            return await tx.report.update({
                where: { id },
                data: {
                    title,
                    description,
                    type,
                    fileId,
                    month,
                    periodId: period.id
                },
                include: {
                    period: true,
                    file: true
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putMonthlyReportRepository",
                entity: "Report",
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
        return await database.$transaction(async (tx) => {
            const current = await tx.report.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Informe mensual no encontrado")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.file?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.file.path))
                } catch (_) { }

                await tx.file.delete({
                    where: { id: current.file.id }
                })
            }

            return await tx.report.delete({
                where: { id }
            })
        })
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