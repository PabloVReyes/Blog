import { database } from "../../../config/prisma"
import { logger } from "../../../utils/logger"

//////////
// READ //
//////////

export const getDerechohacienciaRepository = async () => {
    try {
        return await database.derechohabienciaConfig.findMany({
            include: {
                links: {
                    orderBy: {
                        orderIndex: "asc"
                    }
                }
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getDerechohacienciaRepository",
                entity: "Derechohabiencia",
            },
            "Error fetching derechohabiencia"
        )
        throw new Error("Error al obtener la derechohabiencia")
    }
}

////////////
// UPDATE //
////////////

interface PutDerechohabienciaLinkRepositoryProps {
    id: string;
    title: string;
    url: string;
}

export const putDerechohabienciaLinkRepository = async ({ id, title, url }: PutDerechohabienciaLinkRepositoryProps) => {
    try {
        return await database.derechohabienciaLink.update({
            where: { id },
            data: { title, url }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putDerechohabienciaLinkRepository",
                entity: "Derechohabiencia",
            },
            "Error updating derechohabiencia"
        )
        throw new Error("Error al actualizar el link de derechohabiencia")
    }
}

interface PutDerechohabienciaRepositoryProps {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export const putDerechohabcienciaRepository = async ({ id, title, description, color, icon }: PutDerechohabienciaRepositoryProps) => {
    try {
        return await database.derechohabienciaConfig.update({
            where: { id },
            data: { title, description, color, icon },
            include: { links: { orderBy: { orderIndex: "asc" } } }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putDerechohabcienciaRepository",
                entity: "Derechohabiencia"
            },
            "Error deleting Derechohabiencia"
        )
        throw new Error("Error al actualizar la derechohabiencia")
    }
}