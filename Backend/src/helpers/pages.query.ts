import { database } from "@/database/config"
import { random } from "colors";

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

interface getPageQueryProps {
    skip: number;
    take: number;
}

export const getPagesQuery = ({skip, take}: getPageQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.page.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take,
                skip
            })
            resolve(data)
        } catch {
            reject(false)
        }
    })
}

export const getPagesCountQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.page.count({})
            resolve(data)
        } catch {
            reject(0)
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

export const deletePageQuery = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.page.delete({
                where: {
                    id
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}