import { getDirectoryQuery } from "@/helpers/directory.query"

export const getDirectoryService = async (req: any) => {
    const { page, limit, search } = req.query

    const props = {
        skip: (limit * page - limit),
        take: Number(limit),
        search
    }

    const data = getDirectoryQuery(props)

    return data
}