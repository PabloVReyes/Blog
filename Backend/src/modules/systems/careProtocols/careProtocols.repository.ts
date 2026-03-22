import { database } from "../../../config/prisma"
import { PaginationProps } from "../../../types/pagination"
import { logger } from "../../../utils/logger"

////////////
// CREATE //
////////////

export const postCategoryRepository = async (name: string) => {
    try {
        return await database.categoryCareProtocols.create({
            data: {
                name
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCategoryRepository",
                entity: "CategoryCareProtocols",
                payload: { name }
            },
            "Error creating category"
        )
        throw new Error("Error al crear categoria")
    }
}

interface PostCareProtocolsRepositoryProps {
    title: string;
    description: string;
    category: string;
    fileName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const postCareProtocolsRepository = async ({
    title,
    description,
    category,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostCareProtocolsRepositoryProps) => {
    try {
        return await database.careProtocols.create({
            data: {
                title,
                description,
                categoryCareProtocolsId: category,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCareProtocolsRepository",
                entity: "CareProtocols",
                payload: { title, category }
            },
            "Error creating care protocol"
        )
        throw new Error("Error al crear protocolo")
    }
}

//////////
// READ //
//////////

export const getCategoryRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.categoryCareProtocols.findMany({
                orderBy: { id: "desc" }
            }),
            database.categoryCareProtocols.count()
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoryRepository",
                entity: "CategoryCareProtocols"
            },
            "Error fetching categories"
        )
        throw new Error("Error al obtener categorias")
    }
}

export const getCareProtocolsRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { title: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.careProtocols.findMany({
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
            database.careProtocols.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCareProtocolsRepository",
                entity: "CareProtocols",
                params: { search, take, skip }
            },
            "Error fetching care protocols"
        )
        throw new Error("Error al obtener protocolos")
    }
}

export const getCareProtocolByIdRepository = async (id: string) => {
    try {
        return await database.careProtocols.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCareProtocolByIdRepository",
                entity: "CareProtocols",
                id
            },
            "Error fetching care protocol by id"
        )
        throw new Error("Error al obtener protocolo")
    }
}

export const getCategoryWithCareProtocolsRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            careProtocols: {
                some: {}
            },
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.categoryCareProtocols.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: {
                            careProtocols: true
                        }
                    },
                    careProtocols: true
                }
            }),
            database.categoryCareProtocols.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCategoryWithCareProtocolsRepository",
                entity: "CategoryCareProtocols",
                params: { search, take, skip }
            },
            "Error fetching categories with protocols"
        )
        throw new Error("Error al obtener categorias con protocolos")
    }
}

////////////
// UPDATE //
////////////

interface PutCareProtocolProps extends PostCareProtocolsRepositoryProps {
    id: string;
}

export const putCareProtocolRepository = async ({
    id,
    title,
    description,
    category,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutCareProtocolProps) => {
    try {
        return await database.careProtocols.update({
            where: { id },
            data: {
                title,
                description,
                categoryCareProtocolsId: category,
                fileName,
                filePath,
                fileSize,
                mimeType
            },
            include: {
                category: true
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putCareProtocolRepository",
                entity: "CareProtocols",
                id,
                payload: { title, category }
            },
            "Error updating care protocol"
        )
        throw new Error("Error al actualizar el protocolo")
    }
}

////////////
// DELETE //
////////////

export const deleteCareProtocolsRepository = async (id: string) => {
    try {
        return await database.careProtocols.delete({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteCareProtocolsRepository",
                entity: "CareProtocols",
                id
            },
            "Error deleting care protocol"
        )
        throw new Error("Error al eliminar el protocolo")
    }
}