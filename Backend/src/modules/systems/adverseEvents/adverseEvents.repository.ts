import { database } from "../../../config/prisma"
import { logger } from "../../../utils/logger"

//////////
// READ //
//////////

export const getAdverseEventsByTypeRepository = async (type: string) => {
    try {
        return await database.adverseEvents.findUnique({
            where: {
                type
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getAdverseEventsByTypeRepository",
                entity: "AdverseEvents",
                type
            },
            "Error fetching adverse event by type"
        )
        throw new Error("Error al obtener eventos adversos")
    }
}

export const getAdverseEventsRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.adverseEvents.findMany({}),
            database.adverseEvents.count({}),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getAdverseEventsRepository",
                entity: "AdverseEvents"
            },
            "Error fetching adverse events"
        )
        throw new Error("Error al obtener eventos adversos")
    }
}

export const getAdverseEventsByIdRepository = async (id: string) => {
    try {
        return await database.adverseEvents.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getAdverseEventsByIdRepository",
                entity: "AdverseEvents",
                id
            },
            "Error fetching adverse event by id"
        )
        throw new Error("Error al obtener evento adverso")
    }
}

////////////
// UPDATE //
////////////

interface PutAdverseEventProps {
    id: string;
    fileName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const putAdverseEvent = async ({
    id,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutAdverseEventProps) => {
    try {
        return await database.adverseEvents.update({
            where: { id },
            data: {
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putAdverseEvent",
                entity: "AdverseEvents",
                id,
                payload: { fileName }
            },
            "Error updating adverse event"
        )
        throw new Error("Error en actualizar el evento adverso")
    }
}