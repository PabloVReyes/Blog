import { database } from "../../config/prisma"
///
// READ
//

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
        console.error("Error en user")
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
        console.error("Error al actualizar ultima conexión del usuario")
    }
}