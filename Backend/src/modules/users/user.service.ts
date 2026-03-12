import { getPagination } from "@/utils/pagination"
import { comparePassword, generatePassword, hashPassword } from "../../utils/password"
import * as repo from "./user.repository"
import * as scheme from "./user.scheme"
import { sendUserCredentials } from "@/services/email.service"

export const createUserService = async (dto: scheme.CreateUserScheme) => {
    const { name, email, roles } = dto
    const plainPassword = generatePassword(12)

    const password = await hashPassword(plainPassword)

    const user = await repo.createUserRepository({
        name,
        email,
        password,
        roles
    })

    try {
        await sendUserCredentials({
            email,
            name,
            password: plainPassword,
            message: "Tu cuenta fue creada correctamente."
        })
    } catch (error) {
        console.error("Error enviando correo:", error)
    }

    return user
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

export const putUserService = async (id: string, dto: scheme.PutUserScheme) => {
    const { name, email, roles, active } = dto

    return await repo.putUserReporitory({
        id,
        active,
        email,
        roles,
        name
    })
}

export const putMeService = async (id: string, dto: scheme.PutMeScheme) => {
    const { name, email } = dto

    return await repo.putMeReporitory({
        id,
        email,
        name
    })
}

export const resetPasswordService = async (id: string) => {
    const plainPassword = generatePassword(12)
    const password = await hashPassword(plainPassword)

    const user = await repo.changePasswordRepository(
        id,
        password,
        true,
    )


    try {
        await sendUserCredentials({
            email: user.email,
            name: user.name,
            password: plainPassword,
            message: "Tu contraseña fue restaurada correctamente."
        })
    } catch (error) {
        console.error("Error enviando correo:", error)
    }

    return user
}

export const changePasswordService = async (id: string, dto: scheme.ChangePasswordScheme) => {
    const { newPassword, currentPassword } = dto

    const user = await repo.getUserById(id)

    if (!user) {
        throw new Error("Usuario no encontrado")
    }

    const validPassword = await comparePassword(currentPassword, user.password)

    if (!validPassword) {
        throw new Error("La contraseña actual es incorrecta")
    }

    const password = await hashPassword(newPassword)

    return await repo.changePasswordRepository(id, password, false)
}

export const changeMePasswordService = async (id: string, dto: scheme.ChangeMePasswordScheme) => {
    const { password } = dto
    const user = await repo.getUserById(id)
    if (!user) {
        throw new Error("Usuario no encontrado")
    }
    const newPassword = await hashPassword(password)
    return await repo.changeMePasswordRepository(id, newPassword)
}

export const deleteUserService = async (id: string) => {
    return await repo.deleteUserRepository(id)
}