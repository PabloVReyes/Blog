import { database } from "../../config/prisma"

export const downloadFileRepository = async (id: string) => {
    try {
        return await database.file.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en downloadFileRepository", error)
        throw new Error("Error al obtener descarga")
    }
}