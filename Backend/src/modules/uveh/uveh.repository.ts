import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination";

//
// CREATE 
//

interface PostDownloadRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    categoryId: number
    fileName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const postDownloadRepository = async ({
    name,
    description,
    isNew,
    categoryId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostDownloadRepositoryProps) => {
    try {
        return await database.uveh.create({
            data: {
                name,
                description,
                isNew,
                categoryId,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en postDownloadRepository")
        throw new Error("Error al crear descarga")
    }
}

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.uvehCategory.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("Error en postCategoryRepository")
        throw new Error("Error al crear categoria")
    }
}

//
// READ //
//

export const getCategoriesRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.uvehCategory.findMany(),
            database.uvehCategory.count()
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCategoriesRepository")
        throw new Error("Error al obtener categorias")
    }
}

export const getCategoriesWithDownloadsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            uvehs: {
                some: {}
            },
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.uvehCategory.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: {
                            uvehs: true
                        }
                    },
                    uvehs: true
                }
            }),
            database.uvehCategory.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Erorr en getCategoriesWithDownloadsRepository")
        throw new Error("Error al obtener las categorias con los archivos")
    }
}

export const getDownloadsRepository = async ({ search, take, skip }: PaginationProps) => {
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
                orderBy: {
                    id: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    category: true
                }
            }),
            database.uveh.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getDownloadsRepository")
        throw new Error("Error al obtener descargas")
    }
}

export const getDownloadByIdRepository = async (id: number) => {
    try {
        return await database.uveh.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getDownloadByIdRepository")
        throw new Error("Error al obtener descarga")
    }
}

/////
// UPDATE
//

interface PutDownloadRepositoryProps extends PostDownloadRepositoryProps {
    id: number
}

export const putDownloadRepository = async ({
    id,
    name,
    description,
    isNew,
    categoryId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutDownloadRepositoryProps) => {
    try {
        return await database.uveh.update({
            where: { id },
            data: {
                name,
                description,
                isNew,
                categoryId,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en PutDownloadRepositoryProps", error)
        throw new Error("Error al actualizar descarga")
    }
}

////
// DELETE
///

export const deleteDownloadRepository = async (id: number) => {
    try {
        return await database.uveh.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteDownloadRepository")
        throw new Error("Error al eliminar descarga")
    }
}