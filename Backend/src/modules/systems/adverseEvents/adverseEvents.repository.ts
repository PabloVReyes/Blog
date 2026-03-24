import { database } from "../../../config/prisma"
import { logger } from "../../../utils/logger"
import path from "path"
import fs from "fs/promises"

//////////
// READ //
//////////

export const getAdverseEventsByTypeRepository = async (type: string) => {
    try {
        return await database.adverseEvent.findUnique({
            where: {
                type
            },
            include: {
                file: true
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
            database.adverseEvent.findMany({
                include: {
                    file: true
                }
            }),
            database.adverseEvent.count({}),
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
        return await database.adverseEvent.findUnique({ 
            where: { id },
            include: {
                file: true
            }
        })
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
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const putAdverseEvent = async ({
    id,
    file
}: PutAdverseEventProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.adverseEvent.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
            }

            let fileId = current.fileId
            const uploadsPath = path.join(process.cwd(), 'uploads');

            if (file) {
                if (current.file?.path) {
                    try {
                        const absolutePath = path.join(uploadsPath, current.file.path)
                        await fs.unlink(absolutePath)
                    } catch (_) { }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    })
                }

                const newFile = await tx.file.create({
                    data: file
                })

                fileId = newFile.id
            }

            return await tx.adverseEvent.update({
                where: { id },
                data: {
                    fileId
                },
                include: {
                    file: true
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putAdverseEvent",
                entity: "AdverseEvents",
                id,
            },
            "Error updating adverse event"
        )
        throw new Error("Error en actualizar el evento adverso")
    }
}

////////////
// DELETE //
////////////

export const deleteAdverseEventRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.adverseEvent.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.file?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.file.path))
                } catch (_) { }

                await tx.file.delete({
                    where: { id: current.file.id }
                })
            }

            return await tx.adverseEvent.update({
                where: { id },
                data: {
                    fileId: null
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteAdverseEventRepository",
                entity: "Adverse Event",
                id
            },
            "Error deleting adverse event"
        )
    }
}