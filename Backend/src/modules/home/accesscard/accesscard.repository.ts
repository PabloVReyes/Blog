import { database } from "../../../config/prisma"
import * as path from "path"
import * as fs from "fs/promises"
import { logger } from "../../../utils/logger";

interface PostAccessCardRepositoryProps {
    sectionId: string;
    type: string;
    title: string;
    description: string;
    color: string;
    icon: string;
    isActive: boolean;
    url: string | null;
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
}

export const postAccessCardRepository = async ({
    sectionId, type, title, description, icon, color, isActive, file, url
}: PostAccessCardRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {

            const lastItem = await tx.accessCardItem.findFirst({
                where: { sectionId },
                orderBy: { orderIndex: "desc" }
            })

            let fileId: string | null = null

            if (type === "file" && file) {
                const createdFile = await tx.file.create({
                    data: file
                })
                fileId = createdFile.id
            }

            return await tx.accessCardItem.create({
                data: {
                    sectionId,
                    type,
                    title,
                    description,
                    icon,
                    color,
                    isActive,
                    url: type === "page" ? url : null,
                    fileId,
                    orderIndex: lastItem ? lastItem.orderIndex + 1 : 0
                }
            })
        })
    } catch (error) {
        logger.error(
            { error, operation: "postAccessCardRepository", entity: "AccessCard" },
            "Error creating Access Card"
        )
        throw new Error("Error al crear la access card")
    }
}

//////////
// READ //
//////////

interface GetAccessCardRepositoryProps {
    isActive?: boolean;
    take?: number;
    skip?: number;
    search?: string;
}

export const getAccessCardRepository = async ({
    isActive, take, skip, search
}: GetAccessCardRepositoryProps) => {
    try {
        const where = {
            ...(isActive !== undefined && { isActive }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.accessCardItem.findMany({
                where,
                orderBy: { orderIndex: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: { file: true }
            }),
            database.accessCardItem.count({ where })
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            { error, operation: "getAccessCardRepository", entity: "AccessCard" },
            "Error fetching Access Cards"
        )
        throw new Error("Error al obtener las access card")
    }
}

export const getAccessCardByIdRepository = async (id: string) => {
    try {
        return await database.accessCardItem.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            { error, operation: "getAccessCardByIdRepository", entity: "AccessCard" },
            "Error fetching Access Card by id"
        )
        throw new Error("Error al obtener la access card")
    }
}

////////////
// UPDATE //
////////////

interface PutAccessCardRepositoryProps {
    id: string;
    type: string;
    title: string;
    description: string;
    color: string;
    icon: string;
    isActive: boolean;
    url: string | null;
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
}

export const putAccessCardRepository = async ({
    id, type, color, icon, title, description, url, file, isActive
}: PutAccessCardRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {

            const current = await tx.accessCardItem.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Acceso Rapido no encontrado")
            }

            let fileId = current.fileId
            const uploadsPath = path.join(process.cwd(), 'uploads');

            if (type === "file") {
                if (file) {
                    if (current.file?.path) {
                        try {
                            await fs.unlink(path.join(uploadsPath, current.file.path))
                        } catch (error) {
                            logger.error(
                                { error, operation: "putAccessCardRepository.unlink", entity: "File" },
                                "Error deleting physical file"
                            )
                        }

                        await tx.file.delete({ where: { id: current.file.id } })
                    }

                    const newFile = await tx.file.create({ data: file })
                    fileId = newFile.id
                }
            } else {
                if (current.file?.path) {
                    try {
                        await fs.unlink(path.join(uploadsPath, current.file.path))
                    } catch (error) {
                        logger.error(
                            { error, operation: "putAccessCardRepository.unlink", entity: "File" },
                            "Error deleting physical file"
                        )
                    }

                    await tx.file.delete({ where: { id: current.file.id } })
                }

                fileId = null
            }

            return await tx.accessCardItem.update({
                where: { id },
                data: {
                    type,
                    title,
                    description,
                    icon,
                    color,
                    isActive,
                    url: type === "page" ? url : null,
                    fileId
                },
                include: { file: true }
            })
        })
    } catch (error) {
        logger.error(
            { error, operation: "putAccessCardRepository", entity: "AccessCard" },
            "Error updating Access Card"
        )
        throw new Error("Error al actualizar la access card")
    }
}

////////////
// DELETE //
////////////

export const deleteAccessCardRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {

            const current = await tx.accessCardItem.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Access Card no encontrado")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.file?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.file.path))
                } catch (error) {
                    logger.error(
                        { error, operation: "deleteAccessCardRepository.unlink", entity: "File" },
                        "Error deleting physical file"
                    )
                }

                await tx.file.delete({ where: { id: current.file.id } })
            }

            return await tx.accessCardItem.delete({ where: { id } })
        })
    } catch (error) {
        logger.error(
            { error, operation: "deleteAccessCardRepository", entity: "AccessCard" },
            "Error deleting Access Card"
        )
        throw new Error("Error al eliminar la access card")
    }
}