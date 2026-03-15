import { getPagination } from "../../../utils/pagination"
import * as schema from "./cbim.schema"
import * as repo from "./cbim.repository"

////////////
// CREATE //
////////////

export const postCbimService = async (dto: schema.PostCbimSchema) => {
    const { code, name, description, sp, fpgc, cbt_cae } = dto

    return await repo.postCbimRepository({
        code,
        name,
        description,
        sp,
        fpgc,
        cbt_cae
    })
}

//////////
// READ //
//////////

export const getCbimService = async (dto: schema.GetCbimSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCbimRepository({
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
            firstItem: (page && limit) && limit * (page - 1) + 1,
            lastItem: (page && limit) && Math.min(total, limit * page)
        }
    }
}

////////////
// UPDATE //
////////////

export const putCbimService = async (id: string, dto: schema.PutCbimSchema) => {
    const { code, name, description, sp, fpgc, cbt_cae } = dto

    return await repo.putCbimRepository({
        id,
        code,
        name,
        description,
        sp,
        fpgc,
        cbt_cae
    })
}

////////////
// DELETE //
////////////

export const deleteCbimService = async (id: string) => {
    await repo.deleteCbimRepository(id)
    return true
}
