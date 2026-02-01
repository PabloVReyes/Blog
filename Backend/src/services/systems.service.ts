import { deleteSystemQuery, getSystemsCountQuery, getSystemsQuery, postSystemQuery, putSystemQuery } from "@/helpers/systems.query"

export const postSystemService = async (req: any) => {
    const { icon, color, name, description, url } = req.body
    const props = {
        icon,
        color,
        name,
        description,
        url
    }

    await postSystemQuery(props)

    return true
}

export const getSystemsService = async (req: any) => {
    const { page, limit, search } = req.query

    const props = {
        skip: limit && limit !== 'undefined' ? Number(limit * page - limit) : undefined,
        take: limit && limit !== 'undefined' ? Number(limit) : undefined,
        search: limit !== 'undefined' ? search : undefined
    }

    const data = await getSystemsQuery(props)
    return data
}

export const getSystemsCountService = async (req: any) => {
    const { search } = req.query

    const data = getSystemsCountQuery(search)

    return data
}

export const putSystemService = async (req: any) => {
    const id = req.params.id
    const { icon, color, name, description, url } = req.body

    const props = {
        id,
        icon,
        color,
        name,
        description,
        url
    }

    const data = await putSystemQuery(props)

    return data
}

export const deleteSystemService = async (req: any) => {
    const id = req.params.id
    await deleteSystemQuery(id)
    return true
}