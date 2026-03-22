import { database } from "../../config/prisma"
import { PaginationProps } from "../../types/pagination";
import * as schema from "./user.schema"
import { logger } from "../../utils/logger"

interface Props {
    name: string;
    email: string;
    password: string;
    roles: string[]
}

export const createUserRepository = async (props: Props) => {
    try {
        const { name, email, password, roles } = props

        return await database.user.create({
            data: {
                name,
                email,
                password,
                mustChangePassword: true,
                roles: {
                    create: roles.map((rolId) => ({
                        role: {
                            connect: { id: rolId }
                        }
                    }))
                }
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "createUserRepository",
                entity: "User",
                input: props
            },
            "Error al crear un nuevo usuario"
        )
        throw new Error("Error al crear un nuevo usuario")
    }
}

export const getUsersRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.user.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                omit: {
                    password: true
                },
                include: {
                    roles: {
                        include: {
                            role: true
                        },
                        omit: {
                            roleId: true,
                            userId: true
                        }
                    }
                }
            }),
            database.user.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getUsersRepository",
                entity: "User",
                params: { skip, take, search }
            },
            "Error al obtener lista de usuarios"
        )
        throw new Error("Error al obtener lista de usuarios")
    }
}

export const getUserById = async (id: string) => {
    try {
        return await database.user.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getUserById",
                entity: "User",
                id
            },
            "Error al obtener usuario"
        )
        throw new Error("Error en obtener usuario")
    }
}

////////////
// UPDATE //
////////////

interface PutUserRepositoryProps extends schema.PutUserSchema {
    id: string
}

export const putUserRepository = async (props: PutUserRepositoryProps) => {
    try {
        const { name, email, roles, id, active } = props

        const currentRoles = await database.userRole.findMany({
            where: { userId: id },
            select: { roleId: true }
        })

        const currentIds = currentRoles.map(r => r.roleId)

        const toAdd = roles.filter(roleId => !currentIds.includes(roleId))
        const toRemove = currentIds.filter(roleId => !roles.includes(roleId))

        await database.$transaction([

            database.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    active
                }
            }),

            database.userRole.deleteMany({
                where: {
                    userId: id,
                    roleId: { in: toRemove }
                }
            }),

            database.userRole.createMany({
                data: toAdd.map(roleId => ({
                    userId: id,
                    roleId
                }))
            })

        ])

        return database.user.findUnique({
            where: { id },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putUserRepository",
                entity: "User",
                input: props
            },
            "Error al actualizar usuario"
        )
        throw new Error("Error al actualizar usuario")
    }
}

interface PutMeRepositoryProps extends schema.PutMeSchema {
    id: string;
}

export const putMeRepository = async (props: PutMeRepositoryProps) => {
    try {
        const { name, email, id } = props

        return await database.user.update({
            where: { id },
            data: {
                email,
                name,
            },
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putMeRepository",
                entity: "User",
                input: props
            },
            "Error al actualizar usuario"
        )
        throw new Error("Error al actualizar usuario")
    }
}

export const changePasswordRepository = async (id: string, password: string, mustChangePassword: boolean) => {
    try {
        return await database.user.update({
            where: { id },
            data: {
                password,
                mustChangePassword
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "changePasswordRepository",
                entity: "User",
                id
            },
            "Error al cambiar contraseña del usuario"
        )
        throw new Error("Error al cambiar contraseña del usuario")
    }
}

export const deleteUserRepository = async (id: string) => {
    try {
        return await database.$transaction([
            database.userRole.deleteMany({
                where: { userId: id }
            }),
            database.user.delete({
                where: { id }
            })
        ])
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteUserRepository",
                entity: "User",
                id
            },
            "Error al eliminar usuario"
        )
        throw new Error("Error al eliminar usuario")
    }
}