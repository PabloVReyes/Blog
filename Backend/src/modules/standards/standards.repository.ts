import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";
import * as path from "path"
import * as fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostStandarRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    categoryId: number
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postStandarRepository = async ({
    name,
    description,
    isNew,
    categoryId,
    file
}: PostStandarRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.standard.create({
                data: {
                    name,
                    description,
                    isNew,
                    categoryId,
                    fileId
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postStandarRepository",
                entity: "Standards",
                payload: { name, categoryId }
            },
            "Error creating standard"
        )
        throw new Error("Error al crear norma oficial")
    }
}

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.standardCategory.create({
            data: {
                name
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCategoryRepository",
                entity: "StandardsCategory",
                payload: { name }
            },
            "Error creating category"
        )
        throw new Error("Error al crear categoria")
    }
}

//////////
// READ //
//////////

export const getCategoriesRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.standardCategory.findMany(),
            database.standardCategory.count()
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoriesRepository",
                entity: "StandardsCategory"
            },
            "Error fetching categories"
        )
        throw new Error("Error al obtener las categorias")
    }
}

export const getStandardsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.standard.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true,
                    file: true
                }
            }),
            database.standard.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getStandardsRepository",
                entity: "Standards",
                params: { skip, take, search }
            },
            "Error fetching standards"
        )
        throw new Error("Error al obtener normas")
    }
}

export const getStandarByIdRepository = async (id: number) => {
    try {
        return await database.standard.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getStandarByIdRepository",
                entity: "Standards",
                id
            },
            "Error fetching standard by id"
        )
        throw new Error("Error al obtener norma oficial")
    }
}

////////////
// UPDATE //
////////////

export interface PutStandarRepositoryProps extends PostStandarRepositoryProps {
    id: number
}

export const putStandarRepository = async ({
    id,
    name,
    description,
    isNew,
    categoryId,
    file
}: PutStandarRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.standard.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Norma Oficial no encontrada")
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

            return await tx.standard.update({
                where: {
                    id
                },
                data: {
                    name,
                    description,
                    isNew,
                    categoryId,
                    fileId
                },
                include: {
                    category: true,
                    file: true
                }
            })

        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putStandarRepository",
                entity: "Standards",
                id,
                payload: { name, categoryId }
            },
            "Error updating standard"
        )
        throw new Error("Error al actualizar norma oficial")
    }
}

////////////
// DELETE //
////////////

export const deleteStandarRepository = async (id: number) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.standard.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
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

            return await tx.standard.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteStandarRepository",
                entity: "Standards",
                id
            },
            "Error deleting standard"
        )
        throw new Error("Error al eliminar norma oficial")
    }
}