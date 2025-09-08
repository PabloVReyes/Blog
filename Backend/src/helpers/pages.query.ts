import { database } from "@/database/config"

interface Props {
    title: string;
    slug: string;
    content: string;
    html: string
}

export const publishPageQuery = ({ title, slug, content, html }: Props) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.page.create({
                data: {
                    title,
                    slug,
                    content,
                    html
                }
            })
            resolve(true)
        } catch (error) {
            console.error(error)
            reject(false)
        }
    })
}

export const getPagesQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.page.findMany({})
            resolve(data)
        } catch {
            reject(false)
        }
    })
}

export const getPageQuery = (slug: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.page.findUnique({
                where: {
                    slug
                }
            })
            resolve(data)
        } catch {
            reject(false)
        }
    })
}