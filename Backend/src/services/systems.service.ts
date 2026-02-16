import { deleteSystemQuery, postSystemQuery, putSystemQuery } from "@/helpers/systems.query"

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