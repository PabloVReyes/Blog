import { database } from "../../../config/prisma"

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
        console.error("Error en getAdverseEventsByTypeRepository")
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
        console.error("Error en getAdverseEventsRepository")
        throw new Error("Error al obtener eventos adversos")
    }
}

export const getAdverseEventsByIdRepository = async (id: string) => {
    try {
        return await database.adverseEvents.findUnique({ where: { id } })
    } catch (error) {
        console.error("error en getAdverseEventsByIdRepository")
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
        console.error("Error en PutAdverseEventProps", error)
        throw new Error("Error en actualizar el evento adverso")
    }
}