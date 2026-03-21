import * as schema from "./permission.schema"
import * as repo from "./permission.repository"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"

////////////
// CREATE //
////////////

export const postPermissionsService = async (dto: schema.PostPermissionsSchema) => {
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

export const getPermissionsService = async (dto: schema.GetPermissionsSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getPermissionsRepository({
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

export const putPermissionsService = async (id: string, dto: schema.PostPermissionsSchema) => {
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
