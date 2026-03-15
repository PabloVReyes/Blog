import * as schema from "./directory.schema"
import * as repo from "./directory.repository"
import { getPagination } from "../../utils/pagination"

////////////
// CREATE //
////////////

export const postDirectoryService = async (dto: schema.PostDirectorySchema) => {
    const { phone, name, level, boss, secretary, email } = dto

    return await repo.postDirectoryRepository({
        phone,
        name,
        levelId: level,
        boss,
        secretary,
        email
    })
}

//////////
// READ //
//////////
export const getDirectoryService = async (dto: schema.GetDirectorySchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getDirectoryRepository({
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
            firstItem: (limit && page) && limit * (page - 1) + 1,
            lastItem: (limit && page) && Math.min(total, limit * page)
        }
    }
}

export const getLevelsService = async () => {
    const { data, total } = await repo.getLevelsRepository()

    return {
        data,
        meta: {
            total
        }
    }
}

export const putDirectoryService = async (id: string, dto: schema.PutDirectorySchema) => {
    const { phone, name, level, boss, secretary, email } = dto

    return await repo.putDirectoryRepository({
        id,
        phone,
        name,
        levelId: level,
        boss,
        secretary,
        email
    })
}

///
// DELETE
///

export const deleteDirectoryService = async (id: string) => {
    return await repo.deleteDirectoryRepository(id)
}
