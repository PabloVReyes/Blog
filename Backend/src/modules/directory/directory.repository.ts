import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination"

///
// CREATE
////

interface PostDirectoryRepositoryProps {
    phone: string;
    name: string;
    levelId: string;
    boss: string;
    secretary: string;
    email: string;
}

export const postDirectoryRepository = async ({
    phone,
    name,
    levelId,
    boss,
    secretary,
    email
}: PostDirectoryRepositoryProps) => {
    try {
        return await database.directory.create({
            data: {
                phone,
                name,
                levelId,
                boss,
                secretary,
                email
            }
        })
    } catch (error) {
        console.error("Error en postDirectoryRepository")
        throw new Error("Error al crear directorio")
    }
}

export const getDirectoryRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { phone: { contains: search } },
                    { boss: { contains: search } },
                    { secretary: { contains: search } },
                    { name: { contains: search } },
                ]
            }),
        }

        const [data, total] = await Promise.all([
            database.directory.findMany({
                where,
                orderBy: { phone: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    level: true
                }
            }),
            database.directory.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getDirectoryQuery", error)
        throw new Error("Error al obtener directorio telefonio")
    }
}

export const getLevelsRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.level.findMany(),
            database.level.count()
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getLevelsRepository")
        throw new Error("Error en obtener niveles")
    }
}

////
// UPDATE //
/////

interface PutDirectoryRepositoryProps extends PostDirectoryRepositoryProps {
    id: string;
}

export const putDirectoryRepository = async ({
    id,
    phone,
    name,
    levelId,
    boss,
    secretary,
    email
}: PutDirectoryRepositoryProps) => {
    try {
        return await database.directory.update({
            where: { id },
            data: {
                phone,
                name,
                levelId,
                boss,
                secretary,
                email
            },
            include: {
                level: true
            }
        })
    } catch (error) {
        console.error("Error en PutDirectoryRepositoryProps")
        throw new Error("Error al actualizar directorio")
    }
}

export const deleteDirectoryRepository = async (id: string) => {
    try {
        return await database.directory.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteDirectoryRepository")
        console.error("Error al eliminar directorio")
    }
}