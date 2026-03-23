import { database } from "../../../config/prisma"
import { PaginationProps } from "../../../types/pagination"
import { logger } from "../../../utils/logger"
import * as path from "path"
import * as fs from "fs/promises"

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
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postCareProtocolsRepository = async ({
    title,
    description,
    category,
    file
}: PostCareProtocolsRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null;

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.careProtocols.create({
                data: {
                    title,
                    description,
                    categoryCareProtocolsId: category,
                    fileId
                }
            })
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
                orderBy: { id: "desc" },
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
                    category: true,
                    file: true
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
    file
}: PutCareProtocolProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.careProtocols.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Protocolo no encontrado")
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

            return await tx.careProtocols.update({
                where: { id },
                data: {
                    title,
                    description,
                    categoryCareProtocolsId: category,
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
        return await database.$transaction(async (tx) => {
            const current = await tx.careProtocols.findUnique({
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

            return await tx.careProtocols.delete({
                where: { id }
            })
        })
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