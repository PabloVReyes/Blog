import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import * as schema from "./cie10.schema"
import * as repo from "./cie10.repository"

////////////
// CREATE //
////////////

export const postCie10Service = async (dto: schema.PostCie10Schema) => {
    const { name, code } = dto

    const props = {
        id: code,
        name
    }

    await repo.postCie10Repository(props)

    return true
}

//////////
// READ //
//////////

export const getCie10Service = async (dto: schema.GetCie10Schema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCie10Repository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

////////////
// UPDATE //
////////////

export const putCie10Service = async (id: string, dto: schema.PutCie10Schema) => {
    const { name, code } = dto

    const props = {
        id,
        code,
        name
    }

    return await repo.putCie10Repository(props)
}

////////////
// DELETE //
////////////

export const deleteCie10Service = async (id: string) => {
    await repo.deleteCie10Repository(id)
    return true
}
