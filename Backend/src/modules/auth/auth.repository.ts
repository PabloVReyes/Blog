import { database } from "../../config/prisma"
import { logger } from "../../utils/logger"

//////////
// READ //
//////////

export const getUserByEmailRepository = async (email: string) => {
    try {
        return await database.user.findUnique({
            where: { email },
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                email,
                operation: "getUserByEmailRepository"
            },
            "Error fetching user by email"
        )
        throw new Error("Error al obtener el usuario")
    }
}

////
// UPDATE 
///

export const updateLastLogin = async (id: string) => {
    try {
        await database.user.update({
            where: { id },
            data: {
                lastLoginAt: new Date()
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                userId: id,
                operation: "updateLastLogin"
            },
            "Error updating last login"
        )
        throw new Error("Error al actualizar ultima conexión del usuario")
    }
}