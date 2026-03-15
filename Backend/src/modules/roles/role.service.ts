import { getPagination } from "../../utils/pagination"
import * as repo from "./role.repository"
import * as schema from "./role.schema"

export const postRoleService = async (dto: schema.PostRoleSchema) => {
    const { name, description, permissions } = dto

    return await repo.postRoleRepository({
        name,
        description,
        permissions
    })
}

export const getRolesService = async (dto: schema.GetRolesSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getRolesRepository({
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

export const putRoleService = async (id: string, dto: schema.PutRoleSchema) => {
    const { name, description, permissions } = dto

    return await repo.putRoleRepository({
        id,
        name,
        description,
        permissions
    })
}

////////////
// DELETE //
////////////

export const deleteRoleService = async (id: string) => {
    return await repo.deleteRoleRepository(id)
}