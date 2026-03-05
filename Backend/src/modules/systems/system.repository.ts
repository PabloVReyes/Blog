import { database } from "@/config/prisma";
import { PaginationProps } from "@/types/pagination";

////////////
// CREATE //
////////////
interface PostSystemRepositoryProps {
    acronym: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    type: string;

    url: string | null;

    fileName: string | null;
    storedName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const postSystemRepository = async ({ acronym, name, description, color, icon, url, fileName, filePath, fileSize, mimeType, storedName, type }: PostSystemRepositoryProps) => {
    try {
        await database.systems.create({
            data: {
                acronym,
                name,
                description,
                color,
                icon,
                url,
                type,
                fileName,
                storedName,
                filePath,
                fileSize,
                mimeType
            }
        })

        return true
    } catch (error) {
        console.error("Error en PostSystemRepositoryProps", error)
        throw new Error("Error al crear el sistema")
    }
}

//////////
// READ //
//////////

export const getSystemRepository = async ({ search, take, skip }: PaginationProps) => {
    const where = {
        ...(search && {
            OR: [
                { acronym: { contains: search } },
                { name: { contains: search } },
                { description: { contains: search } },
            ],
        }),
    }

    const [data, total] = await Promise.all([
        database.systems.findMany({
            where,
            orderBy: { createdAt: "asc" },
            ...(take !== undefined && { take }),
            ...(skip !== undefined && { skip }),
        }),
        database.systems.count({ where }),
    ])

    return { data, total }
}

export const getSystemByIdRepository = async (id: string) => {
    try {
        return await database.systems.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getSystemByIdRepository", error)
        throw new Error("Error al obtener el sistema")
    }
}

////////////
// UPDATE //
////////////
interface PutSystemRepositoryProps {
    id: string;
    acronym: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    type: string;

    url: string | null;

    fileName: string | null;
    storedName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const putSystemRepository = async ({ id, acronym, name, description, color, icon, url, type, fileName, filePath, fileSize, storedName, mimeType }: PutSystemRepositoryProps) => {
    try {
        return await database.systems.update({
            where: { id },
            data: {
                acronym,
                name,
                description,
                color,
                icon,
                url,
                type,
                fileName,
                storedName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("error en putSystemRepository", error)
        throw new Error("Error al actualizar el sistema")
    }
}

////////////
// DELETE //
////////////

export const deleteSystemRepository = async (id: string) => {
    try {
        return await database.systems.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteSystemRepository", error)
        throw new Error("Error al eliminar sistema")
    }
}