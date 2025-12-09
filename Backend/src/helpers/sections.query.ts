import { database } from "@/database/config"

export const getSectionsQuery = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const data = await database.sectionHome.findMany({})
            resolve(data)
        } catch (error) {
            console.error("Error en getSectionsService", error)
            reject([])
        }
    })
}

interface Props {
    title: string
    content?: string
    image?: string
    url?: string
}

export const putSectionQuery = (id: number, props: Props) => {
    return new Promise(async(resolve, reject) => {
        try {
            await database.sectionHome.update({
                where: {
                    id
                },
                data: {
                    ...props
                }
            })

            resolve(true)
        } catch (error) {
            console.error("Error en putSectionQuery", error)
            reject(false)
        }
    })
}