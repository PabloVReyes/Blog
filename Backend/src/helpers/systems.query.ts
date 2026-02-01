import { database } from "@/database/config"

interface PostSystemQueryProps {
    icon: string;
    color: string;
    name: string;
    description: string;
    url: string;
}

interface getSystemsQueryProps {
    take: number
    skip: number
    search: string
}

export const getSystemsQuery = ({ skip, take, search }: getSystemsQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const whereClause = search
                ? {
                    OR: [
                        { name: { contains: search } },
                        { description: { contains: search } },
                        { url: { contains: search } },
                    ],
                }
                : undefined;

            const data = await database.systems.findMany({
                where: whereClause,
                orderBy: {
                    name: "asc"
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            })
            resolve(data)
        } catch (error) {
            console.error("error en getSystemsQuery", error)
            reject([])
        }
    })
}

export const getSystemsCountQuery = (search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const whereClause = search
                ? {
                    OR: [
                        { name: { contains: search } },
                        { description: { contains: search } },
                        { url: { contains: search } },
                    ],
                }
                : undefined;

            const data = await database.systems.count({
                where: whereClause
            })

            resolve(data)
        } catch (error) {
            console.error("error en getSystemsCountQUery", error)
            reject(0)
        }
    })
}

export const postSystemQuery = ({ icon, color, name, description, url }: PostSystemQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.systems.create({
                data: {
                    icon,
                    color,
                    name,
                    description,
                    url
                }
            })

            resolve(true)
        } catch (error) {
            console.error("Error en postSystemQuery", error)
            reject(false)
        }
    })
}

interface putSystemProps extends PostSystemQueryProps {
    id: string
}

export const putSystemQuery = ({ id, icon, color, name, description, url }: putSystemProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.systems.update({
                where: { id },
                data: {
                    id,
                    icon,
                    color,
                    name,
                    description,
                    url
                }
            })

            resolve(data)
        } catch (error) {
            console.error("Error en putSystemQuery", error)
            reject(false)
        }
    })
}

export const deleteSystemQuery = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.systems.delete({
                where: { id }
            })

            resolve(true)
        } catch (error) {
            console.error("Error en deleteSystemQuery")
            reject(false)
        }
    })
}