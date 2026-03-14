import { getPagination } from "../../utils/pagination"
import * as repo from "./role.repository"
import * as scheme from "./role.scheme"

export const postRoleService = async (dto: scheme.PostRoleScheme) => {
    const { name, description, permissions } = dto

    return await repo.postRoleRepository({
        name,
        description,
        permissions
    })
}

export const getRolesService = async (dto: scheme.GetRolesScheme) => {
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

export const putRoleService = async (id: string, dto: scheme.PutRoleScheme) => {
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