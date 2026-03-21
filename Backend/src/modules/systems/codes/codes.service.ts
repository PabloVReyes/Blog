import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import * as repo from "./codes.repository"
import * as schema from "./codes.schema"

//////////
// READ //
//////////

export const getCodesService = async (dto: schema.GetCodesSchema) => {
    const { page, limit, search, categoryId } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCodesRepository({
        skip,
        take,
        search,
        categoryId
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getCategorysService = async () => {
    const { data, total } = await repo.getCategoryRepository()
    
    return {
        data,
        meta: buildPaginationMeta(total)
    }
}