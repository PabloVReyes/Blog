import { database } from "@/config/prisma"
import * as scheme from "./downloads.scheme"
import { PaginationProps } from "@/types/pagination"

////////////
// CREATE //
////////////

interface PostAreaRepositoryProps extends scheme.PostAreaSchema {
    slug: string
}

export const postAreaRepository = async ({ name, icon, color, slug }: PostAreaRepositoryProps) => {
    try {
        return await database.downloadArea.create({
            data: {
                name,
                icon,
                color,
                slug
            }
        })
    } catch (error) {
        console.error("Error en postAreaRepository")
        throw new Error("Error al crear el área")
    }
}

//////////
// READ //
//////////

export const getAreasRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.downloadArea.findMany({
                where,
                orderBy: { createdAt: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.downloadArea.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getAreasRepository")
        throw new Error("Error al obtener las áreas")
    }
}

export const getAreaWithDownloadsRepository = async (slug: string) => {
    try {
        return await database.downloadArea.findUnique({
            where: {
                slug
            }
        })
    } catch (error) {
        console.error("Error en getAreaWithDownloadsRepository")
        throw new Error("Error al obtener area")
    }
}

////////////
// UPDATE //
////////////

interface PutAreaRepositoryProps extends PostAreaRepositoryProps {
    id: number
}

export const putAreaRepository = async ({ id, name, icon, color, slug }: PutAreaRepositoryProps) => {
    try {
        return await database.downloadArea.update({
            where: {
                id
            },
            data: {
                name,
                icon,
                color,
                slug
            }
        })
    } catch (error) {
        console.error("Error en putAreaRepository")
        throw new Error("Error al actualizar el área")
    }
}

export const deleteAreaRepository = async (id: number) => {
    try {
        return await database.downloadArea.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteAreaRepository")
        throw new Error("Error al eliminar el área")
    }
}