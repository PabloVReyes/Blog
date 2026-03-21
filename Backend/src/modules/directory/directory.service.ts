import * as schema from "./directory.schema"
import * as repo from "./directory.repository"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"

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
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getLevelsService = async () => {
    const { data, total } = await repo.getLevelsRepository()

    return {
        data,
        meta: buildPaginationMeta(total)
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

// 70 lineas