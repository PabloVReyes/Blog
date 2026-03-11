import { getPagination } from "@/utils/pagination"
import { hashPassword } from "../../utils/password"
import * as repo from "./user.repository"
import * as scheme from "./user.scheme"

export const createUserService = async (data) => {
    const password = await hashPassword(data.password)
    return await repo.createUserRepository({
        name: data.name,
        email: data.email,
        password
    })
}

export const getUsersService = async (dto: scheme.GetUsersScheme) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getUsersRepository({
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