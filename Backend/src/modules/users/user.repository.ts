import { database } from "@/config/prisma"
import { PaginationProps } from "@/types/pagination";
import * as scheme from "./user.scheme"

interface Props {
    name: string;
    email: string;
    password: string;
    roles: string[]
}

export const createUserRepository = async ({ name, email, password, roles }: Props) => {
    try {
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
        console.error("error en createUser", error)
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
        console.error("Error en getUsers")
        throw new Error("Error al obtener lista de usuarios")
    }
}

export const getUserById = async (id: string) => {
    try {
        return await database.user.findUnique({ where: { id } })
    } catch (error) {
        console.error("error en getUserById")
        throw new Error("Error en obtener usuario")
    }
}

////////////
// UPDATE //
////////////

interface PutUserReporitoryProps extends scheme.PutUserScheme {
    id: string
}

export const putUserReporitory = async ({ name, email, roles, id, active }: PutUserReporitoryProps) => {
    try {
        return await database.user.update({
            where: { id },
            data: {
                active,
                email,
                name,
                roles: {
                    deleteMany: {},
                    create: roles.map((rolId) => ({
                        role: {
                            connect: { id: rolId }
                        }
                    }))
                }
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        })
    } catch (error) {
        console.error("Error en putUserReporitory")
        throw new Error("Error al actualizar usuario")
    }
}

interface PutMeRepositoryProps extends scheme.PutMeScheme {
    id: string;
}

export const putMeReporitory = async ({ name, email, id }: PutMeRepositoryProps) => {
    try {
        return await database.user.update({
            where: { id },
            data: {
                email,
                name,
            },
        })
    } catch (error) {
        console.error("Error en putUserReporitory")
        throw new Error("Error al actualizar usuario")
    }
}

export const changePasswordRepository = (id: string, password: string, mustChangePassword: boolean) => {
    try {
        return database.user.update({
            where: { id },
            data: {
                password,
                mustChangePassword
            }
        })
    } catch (error) {
        console.error("error en changePasswordRepository")
        throw new Error("Error al cambiar contraseña del usuario")
    }
}

export const changeMePasswordRepository = (id: string, password: string) => {
    try {
        return database.user.update({
            where: { id },
            data: {
                password,
                mustChangePassword: false
            }
        })
    } catch (error) {
        console.error("error en changePasswordRepository")
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
        console.error("Error en deleteUserRepository", error)
        throw new Error("Error al eliminar usuario")
    }
} 