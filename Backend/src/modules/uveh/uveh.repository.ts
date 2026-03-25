import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";
import path from "path"
import fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostUVEHRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    categoryId: string
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postUVEHRepository = async ({ name, description, isNew, categoryId, file }: PostUVEHRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null;

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.uveh.create({
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
                operation: "postDownloadRepository",
                entity: "Uveh",
            },
            "Error al crear descarga"
        )
        throw new Error("Error al crear descarga")
    }
}

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.uvehCategory.create({
            data: { name }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCategoryRepository",
                entity: "UvehCategory",
                input: { name }
            },
            "Error al crear categoria"
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
            database.uvehCategory.findMany(),
            database.uvehCategory.count()
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoriesRepository",
                entity: "UvehCategory"
            },
            "Error al obtener categorias"
        )
        throw new Error("Error al obtener categorias")
    }
}

export const getCategoriesWithUVEHRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            uvehs: { some: {} },
            ...(search && {
                OR: [{ name: { contains: search } }],
            }),
        }

        const [data, total] = await Promise.all([
            database.uvehCategory.findMany({
                where,
                orderBy: { name: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: { uvehs: true }
                    },
                    uvehs: {
                        include: {
                            file: true
                        }
                    },
                }
            }),
            database.uvehCategory.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoriesWithDownloadsRepository",
                entity: "UvehCategory",
                params: { skip, take, search }
            },
            "Error al obtener categorias con archivos"
        )
        throw new Error("Error al obtener las categorias con los archivos")
    }
}

export const getUVEHRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.uveh.findMany({
                where,
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true,
                    file: true
                }
            }),
            database.uveh.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getDownloadsRepository",
                entity: "Uveh",
                params: { search, take, skip }
            },
            "Error al obtener descargas"
        )
        throw new Error("Error al obtener descargas")
    }
}

export const getUVEHByIdRepository = async (id: string) => {
    try {
        return await database.uveh.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getDownloadByIdRepository",
                entity: "Uveh",
                id
            },
            "Error al obtener descarga"
        )
        throw new Error("Error al obtener descarga")
    }
}

////////////
// UPDATE //
////////////

interface PutUVEHRepositoryProps extends PostUVEHRepositoryProps {
    id: string
}

export const putUVEHRepository = async ({ name, description, id, isNew, categoryId, file }: PutUVEHRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.uveh.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
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

            return await tx.uveh.update({
                where: { id },
                data: {
                    name,
                    description,
                    isNew,
                    categoryId,
                    fileId
                },
                include: {
                    file: true
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putDownloadRepository",
                entity: "Uveh",
            },
            "Error al actualizar descarga"
        )
        throw new Error("Error al actualizar descarga")
    }
}

////////////
// DELETE //
//////////// 

export const deleteUVEHRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.uveh.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("UVEH no encontrado")
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

            return await tx.uveh.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteDownloadRepository",
                entity: "Uveh",
                id
            },
            "Error al eliminar descarga"
        )
        throw new Error("Error al eliminar descarga")
    }
}