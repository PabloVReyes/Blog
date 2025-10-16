import { deletePageQuery, getAllPagesQuery, getPageQuery, getPagesCountQuery, getPagesQuery, publishPageQuery } from "@/helpers/pages.query"
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
    search: string;
}

export const getPagesService = async ({ page, limit, search }: getPagesServiceProps) => {
    const skip = (limit * page - limit)
    const take = limit

    const data = await getPagesQuery({ skip, take, search })
    return data
}

export const getPagesCountService = async (search: string) => {
    const data = await getPagesCountQuery(search)
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

export const getAllPagesService = async () => {
    const data: any = await getAllPagesQuery()

    const Pages = []

    data.map((page) => {
        const Data = {
            title: page.title,
            slug: page.slug
        }

        Pages.push(Data)
    })

    return Pages
}