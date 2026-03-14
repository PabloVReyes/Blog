import * as scheme from "./permission.scheme"
import * as repo from "./permission.repository"
import { getPagination } from "../../utils/pagination"

////////////
// CREATE //
////////////

export const postPermissionsService = async (dto: scheme.PostPermissionsScheme) => {
    const { name, description, active, key } = dto

    return await repo.postPermissionRepository({
        name,
        description,
        key,
        active
    })
}

//////////
// READ //
//////////

export const getPermissionsService = async (dto: scheme.GetPermissionsScheme) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getPermissionsRepository({
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

////////////
// UPDATE //
////////////

export const putPermissionsService = async (id: string, dto: scheme.PostPermissionsScheme) => {
    const { name, description, active, key } = dto

    return await repo.putPermissionRepository({
        id,
        name,
        description,
        key,
        active
    })
}

////
// DELETE
///

export const deletePermissionService = async (id: string) => {
    return await repo.deletePermissionRepository(id)
}
