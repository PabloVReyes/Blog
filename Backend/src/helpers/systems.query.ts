import { database } from "@/config/prisma"

interface PostSystemQueryProps {
    icon: string;
    color: string;
    name: string;
    description: string;
    url: string;
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