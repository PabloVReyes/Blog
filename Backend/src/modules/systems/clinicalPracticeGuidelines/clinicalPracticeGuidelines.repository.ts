import { database } from "../../../config/prisma"
import { PaginationProps } from "../../../types/pagination";
import { logger } from "../../../utils/logger";
import path from "path"
import fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostClinicalPracticeGuidelinesReporisoryProps {
    code: string;
    title: string;
    category: string;
    fileER?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
    fileRR?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postClinicalPracticeGuidelinesReporisory = async ({
    code,
    title,
    category,
    fileER,
    fileRR
}: PostClinicalPracticeGuidelinesReporisoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileERId: string | null = null
            let fileRRId: string | null = null

            if (fileER) {
                const createFile = await tx.file.create({
                    data: fileER
                })

                fileERId = createFile.id
            }

            if (fileRR) {
                const createFile = await tx.file.create({
                    data: fileRR
                })

                fileRRId = createFile.id
            }

            return await tx.clinicalPracticeGuideline.create({
                data: {
                    code,
                    title,
                    categoryId: category,
                    fileERId,
                    fileRRId
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postClinicalPracticeGuidelinesReporisory",
                entity: "ClinicalPracticeGuidelines",
                code
            },
            "Error al crear guía clínica"
        )
        throw new Error("Error al crear la guia")
    }
}

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.category.create({
            data: { name }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCategoryRepository",
                entity: "Category",
                name
            },
            "Error al crear categoría"
        )
        throw new Error("Error al crear nueva categoria")
    }
}

//////////
// READ //
//////////

interface GetClinicalPracticeGuidelinesRepositoryProps extends PaginationProps {
    categoryId?: string;
}

export const getClinicalPracticeGuidelinesRepository = async ({ search, take, skip, categoryId }: GetClinicalPracticeGuidelinesRepositoryProps) => {
    try {
        const where = {
            ...(categoryId && { categoryId }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { code: { contains: search } },
                    {
                        category: {
                            name: { contains: search }
                        }
                    },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.clinicalPracticeGuideline.findMany({
                where,
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true,
                    fileER: true,
                    fileRR: true
                }
            }),
            database.clinicalPracticeGuideline.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getClinicalPracticeGuidelinesRepository",
                entity: "ClinicalPracticeGuidelines",
                search,
                categoryId
            },
            "Error al obtener guías clínicas"
        )
        throw new Error("Error al obtener guias")
    }
}

export const getCategoryRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.category.findMany({ orderBy: { id: "asc" } }),
            database.category.count(),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoryRepository",
                entity: "Category"
            },
            "Error al obtener categorías"
        )
        throw new Error("Error al obtener categorias")
    }
}

export const getClinicalPracticeGuidelineByIdRepository = async (id: string) => {
    try {
        return await database.clinicalPracticeGuideline.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getClinicalPracticeGuidelineByIdRepository",
                entity: "ClinicalPracticeGuidelines",
                id
            },
            "Error al obtener guía por ID"
        )
        throw new Error("Error al obtener la guia")
    }
}

////////////
// UPDATE //
////////////

interface PutClinicalPracticeGuidelinesReporisoryProps extends PostClinicalPracticeGuidelinesReporisoryProps {
    id: string;
}

export const putClinicalPracticeGuidelinesReporisory = async ({
    id,
    code,
    title,
    category,
    fileER,
    fileRR
}: PutClinicalPracticeGuidelinesReporisoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.clinicalPracticeGuideline.findUnique({
                where: { id },
                include: {
                    fileER: true,
                    fileRR: true
                }
            })

            if (!current) {
                throw new Error("Guías no encontradas")
            }

            let fileERId = current.fileERId
            let fileRRId = current.fileRRId
            const uploadsPath = path.join(process.cwd(), 'uploads');

            if (fileER) {
                if (current.fileER?.path) {
                    try {
                        const absolutePath = path.join(uploadsPath, current.fileER.path)
                        await fs.unlink(absolutePath)
                    } catch (_) { }

                    await tx.file.delete({
                        where: { id: current.fileER.id }
                    })
                }

                const newFile = await tx.file.create({
                    data: fileER
                })

                fileERId = newFile.id
            }

            if (fileRR) {
                if (current.fileRR?.path) {
                    try {
                        const absolutePath = path.join(uploadsPath, current.fileRR.path)
                        await fs.unlink(absolutePath)
                    } catch (_) { }

                    await tx.file.delete({
                        where: { id: current.fileRR.id }
                    })
                }

                const newFile = await tx.file.create({
                    data: fileRR
                })

                fileRRId = newFile.id
            }

            return await tx.clinicalPracticeGuideline.update({
                where: { id },
                data: {
                    code,
                    title,
                    categoryId: category,
                    fileERId,
                    fileRRId
                },
                include: {
                    category: true,
                    fileER: true,
                    fileRR: true
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putClinicalPracticeGuidelinesReporisory",
                entity: "ClinicalPracticeGuidelines",
                id
            },
            "Error al actualizar guía clínica"
        )
        throw new Error("Error al actualizar la guia")
    }
}

////////////
// DELETE //
////////////

export const deleteClinicalPracticeGuidelinesRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.clinicalPracticeGuideline.findUnique({
                where: { id },
                include: {
                    fileER: true,
                    fileRR: true
                }
            })

            if (!current) {
                throw new Error("Guías no encontradas")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.fileER?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.fileER.path))
                } catch (_) { }

                await tx.file.delete({
                    where: { id: current.fileER.id }
                })
            }

            if (current.fileRR?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.fileRR.path))
                } catch (_) { }

                await tx.file.delete({
                    where: { id: current.fileRR.id }
                })
            }

            return await tx.clinicalPracticeGuideline.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteClinicalPracticeGuidelinesRepository",
                entity: "ClinicalPracticeGuidelines",
                id
            },
            "Error al eliminar guía clínica"
        )
        throw new Error("Error al eliminar guía")
    }
}