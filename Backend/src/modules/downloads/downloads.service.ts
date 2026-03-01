import slugify from "slugify"
import * as scheme from "./downloads.scheme"
import * as repo from "./downloads.repository"
import { getPagination } from "@/utils/pagination"

////////////
// CREATE //
////////////

export const postAreaService = async (dto: scheme.PostAreaSchema) => {
    const { name, icon, color } = dto
    const slug = slugify(name, { lower: true, strict: true })

    return await repo.postAreaRepository({
        name,
        icon,
        color,
        slug
    })
}

//////////
// READ //
//////////

export const getAreasService = async (dto: scheme.GetAreaSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getAreasRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: page && limit * (page - 1) + 1,
            lastItem: page && Math.min(total, limit * page)
        }
    }
}

export const getAreaWithDownloads = async (slug: string) => {
    return await repo.getAreaWithDownloadsRepository(slug)
}

////////////
// UPDATE //
////////////

export const putAreaService = async (id: number, dto: scheme.PutAreaSchema) => {
    const { name, icon, color } = dto
    const slug = slugify(name, { lower: true, strict: true })

    return await repo.putAreaRepository({
        id,
        name,
        icon,
        color,
        slug
    })
}

////////////
// DELETE //
////////////

export const deleteAreaService = async (id: number) => {
    return repo.deleteAreaRepository(id)
}
