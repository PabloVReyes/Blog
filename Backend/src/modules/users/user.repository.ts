import { database } from "@/config/prisma"
import { PaginationProps } from "@/types/pagination";

interface Props {
    name: string;
    email: string;
    password: string;
}

export const createUserRepository = async ({ name, email, password }: Props) => {
    try {
        return await database.user.create({
            data: {
                name,
                email,
                password
            }
        })
    } catch (error) {
        console.error("error en createUser")
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