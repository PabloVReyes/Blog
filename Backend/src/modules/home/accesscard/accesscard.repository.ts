import { database } from "../../../config/prisma"
import * as path from "path"
import * as fs from "fs/promises"

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

export const postAccessCardRepository = async ({ sectionId, type, title, description, icon, color, isActive, file, url }: PostAccessCardRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const lastItem = await database.accessCardItem.findFirst({
                where: { sectionId },
                orderBy: { orderIndex: "desc" }
            })

            let fileId: string | null = null

            if (type == "file" && file) {
                const createdFile = await tx.file.create({
                    data: {
                        name: file.name,
                        path: file.path,
                        size: file.size,
                        mimeType: file.mimeType
                    }
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
        console.error("Error en postAccessCardRepository", error)
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

export const getAccessCardRepository = async ({ isActive, take, skip, search }: GetAccessCardRepositoryProps) => {
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
                include: {
                    file: true
                }
            }),
            database.accessCardItem.count({ where })
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getAccessCardRepository", error)
        throw new Error("Error al obtener las access card")
    }
}

export const getAccessCardByIdRepository = async (id: string) => {
    try {
        return await database.accessCardItem.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getAccessCardByIdRepository", error)
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

export const putAccessCardRepository = async ({ id, type, color, icon, title, description, url, file, isActive }: PutAccessCardRepositoryProps) => {
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
                            const absolutePath = path.join(uploadsPath, current.file.path)
                            await fs.unlink(absolutePath)
                        } catch (error) {
                            console.warn("No se pudo eliminar archivo físico:", error)
                        }

                        await tx.file.delete({
                            where: { id: current.file.id }
                        })
                    }

                    const newFile = await tx.file.create({
                        data: file
                    })

                    fileId = newFile.id
                }
            } else {
                if (current.file?.path) {
                    try {
                        await fs.unlink(path.join(uploadsPath, current.file.path));
                    } catch (e) {
                        console.warn("No se pudo eliminar archivo:", e);
                    }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    });
                }

                fileId = null
            }

            return await tx.accessCardItem.update({
                where: {
                    id
                },
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
                include: {
                    file: true
                }
            })
        })
    } catch (error) {
        console.error("error en postAccessCardQuery", error)
        throw new Error("Error al actualizar la access card")
    }
}

////////////
// DELETE //
////////////

export const deleteAccessCardRepository = async (id: string) => {
    try {
        return await database.accessCardItem.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteAccessCardRepository", error)
        throw new Error("Error al eliminar la access card")
    }
}