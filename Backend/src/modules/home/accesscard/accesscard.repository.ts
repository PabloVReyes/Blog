import { database } from "@/config/prisma"
import { ca } from "zod/v4/locales";

interface PostAccessCardRepositoryProps {
    sectionId: string;
    type: string;
    title: string;
    description: string;
    color: string;
    icon: string;
    isActive: boolean;

    url: string | null;

    fileName: string | null;
    storedName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const postAccessCardRepository = async ({ sectionId, type, title, description, icon, color, isActive, fileName, storedName, filePath, fileSize, mimeType, url }: PostAccessCardRepositoryProps) => {
    try {
        const lastItem = await database.accessCardItem.findFirst({
            where: { sectionId },
            orderBy: { orderIndex: "desc" }
        })

        await database.accessCardItem.create({
            data: {
                sectionId,
                type,
                title,
                description,
                icon,
                color,
                isActive,

                url: type === "page" ? url : null,

                // si es archivo
                fileName: type === "file" ? fileName : null,
                storedName: type === "file" ? storedName : null,
                filePath: type === "file" ? filePath : null,
                fileSize: type === "file" ? fileSize : null,
                mimeType: type === "file" ? mimeType : null,

                orderIndex: lastItem ? lastItem.orderIndex + 1 : 0
            }
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

    fileName: string | null;
    storedName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const putAccessCardRepository = async ({ id, type, color, icon, title, description, url, fileName, storedName, filePath, fileSize, mimeType, isActive }: PutAccessCardRepositoryProps) => {
    try {
        return await database.accessCardItem.update({
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

                // si es archivo
                fileName: type === "file" ? fileName : null,
                storedName: type === "file" ? storedName : null,
                filePath: type === "file" ? filePath : null,
                fileSize: type === "file" ? fileSize : null,
                mimeType: type === "file" ? mimeType : null,
            }
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