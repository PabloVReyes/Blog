import { database } from "@/database/config"
import { random } from "colors";

interface Props {
    title: string;
    slug: string;
    content: string;
}

export const publishPageQuery = ({ title, slug, content }: Props) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.page.create({
                data: {
                    title,
                    slug,
                    content,
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
    search: string;
}

export const getPagesQuery = ({ skip, take, search }: getPageQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { title: { contains: search } },
                        { slug: { contains: search } }
                    ]
                }
            }

            const data = await database.page.findMany({
                where: whereCondition,
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

export const getPagesCountQuery = (search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {}

            if (search && search.trim() != "") {
                whereCondition = {
                    OR: [
                        { title: { contains: search } },
                        { slug: { contains: search } }
                    ]
                }
            }

            const data = await database.page.count({
                where: whereCondition
            })

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

export const getAllPagesUrlQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await database.page.findMany({
                select: {
                    slug: true
                }
            })
            resolve(data)
        } catch {
            reject([])
        }
    })
}