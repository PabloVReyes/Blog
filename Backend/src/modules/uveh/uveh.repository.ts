import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";

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

export const postDownloadRepository = async (props: PostDownloadRepositoryProps) => {
    try {
        return await database.uveh.create({
            data: props
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postDownloadRepository",
                entity: "Uveh",
                input: props
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

export const getCategoriesWithDownloadsRepository = async ({ skip, take, search }: PaginationProps) => {
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
                    uvehs: true
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
                orderBy: { id: "asc" },
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

export const getDownloadByIdRepository = async (id: number) => {
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

/////
// UPDATE
//

interface PutDownloadRepositoryProps extends PostDownloadRepositoryProps {
    id: number
}

export const putDownloadRepository = async (props: PutDownloadRepositoryProps) => {
    try {
        const { id, ...data } = props

        return await database.uveh.update({
            where: { id },
            data
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putDownloadRepository",
                entity: "Uveh",
                input: props
            },
            "Error al actualizar descarga"
        )
        throw new Error("Error al actualizar descarga")
    }
}

////////////
// DELETE //
//////////// 

export const deleteDownloadRepository = async (id: number) => {
    try {
        return await database.uveh.delete({ where: { id } })
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