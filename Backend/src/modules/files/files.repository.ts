import { database } from "../../config/prisma"
import { logger } from "../../utils/logger"

export const downloadFileRepository = async (id: string) => {
    try {
        return await database.file.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "downloadFileRepository",
                entity: "File",
                input: { id }
            },
            "Error fetching file"
        )
        throw new Error("Error al obtener descarga")
    }
}