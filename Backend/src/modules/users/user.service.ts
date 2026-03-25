import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import { comparePassword, generatePassword, hashPassword } from "../../utils/password"
import * as repo from "./user.repository"
import * as schema from "./user.schema"
import { sendUserCredentials } from "../../services/email.service"
import { logger } from "../../utils/logger"

export const createUserService = async (dto: schema.CreateUserSchema) => {
    const { name, email, roles } = dto
    const plainPassword = generatePassword(12)

    const password = await hashPassword(plainPassword)

    const user = await repo.createUserRepository({
        name,
        email,
        password,
        roles,
        emailSent: false,
    })

    try {
        await sendUserCredentials({
            email,
            name,
            password: plainPassword,
            message: "Tu cuenta fue creada correctamente."
        })

        await repo.markEmailSent(user.id)
    } catch (error) {
        logger.warn({ error }, "Email Send failed")
        await repo.markEmailFailed(user.id)
    }

    return user
}

export const getUsersService = async (dto: schema.GetUsersSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getUsersRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const putUserService = async (id: string, dto: schema.PutUserSchema) => {
    const { name, email, roles, active } = dto

    return await repo.putUserRepository({
        id,
        active,
        email,
        roles,
        name
    })
}

export const putMeService = async (id: string, dto: schema.PutMeSchema) => {
    const { name, email } = dto

    return await repo.putMeRepository({
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
        logger.warn({ error }, "Email Send failed")
    }

    return user
}

export const changePasswordService = async (id: string, dto: schema.ChangePasswordSchema) => {
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

export const deleteUserService = async (id: string) => {
    return await repo.deleteUserRepository(id)
}