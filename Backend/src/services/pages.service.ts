import { getPageQuery, getPagesQuery, publishPageQuery } from "@/helpers/pages.query"
import slugify from "slugify"

interface Props {
    title: string,
    content: string
    html: string
}

export const publishPageService = async ({title, content, html}: Props) => {
    const slug = slugify(title, {lower: true, strict: true})
    await publishPageQuery({title, slug, content, html})
    return true
}

export const getPagesService = async () => {
    const data = await getPagesQuery()
    return data
}

export const getPageService = async (slug: string) => {
    const data = await getPageQuery(slug)
    return data
}