import { deletePageQuery, getPageQuery, getPagesCountQuery, getPagesQuery, publishPageQuery } from "@/helpers/pages.query"
import slugify from "slugify"

interface publishPageServiceProps {
    title: string,
    content: string
    html: string
}

export const publishPageService = async ({ title, content, html }: publishPageServiceProps) => {
    const slug = slugify(title, { lower: true, strict: true })
    await publishPageQuery({ title, slug, content, html })
    return true
}

interface getPagesServiceProps {
    page: number;
    limit: number;
}

export const getPagesService = async ({ page, limit }: getPagesServiceProps) => {
    const skip = (limit * page - limit)
    const take = limit

    const data = await getPagesQuery({ skip, take })
    return data
}

export const getPagesCountService = async () => {
    const data = await getPagesCountQuery()
    return data
}

export const getPageService = async (slug: string) => {
    const data = await getPageQuery(slug)
    return data
}

export const deletePageService = async (id: string) => {
    await deletePageQuery(id)
    return true
}