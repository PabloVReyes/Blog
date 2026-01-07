import { deletePageQuery, getAllPagesUrlQuery, getPageQuery, getPagesCountQuery, getPagesQuery, publishPageQuery } from "@/helpers/pages.query"
import slugify from "slugify"

interface publishPageServiceProps {
    title: string,
    content: string
}

export const publishPageService = async ({ title, content }: publishPageServiceProps) => {
    const slug = slugify(title, { lower: true, strict: true })
    await publishPageQuery({ title, slug, content })
    return true
}

export const uploadPageImageService = async (req: any) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    return {
        success: 1,
        file: {
            url: imageUrl
        }
    };
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

export const getAllPagesUrlService = async () => {
    const data: any = await getAllPagesUrlQuery()

    const Pages = []

    data.map((page) => {
        const Data = {
            value: `/${page.slug}`,
            label: `/${page.slug}`
        }

        Pages.push(Data)
    })

    return Pages
}