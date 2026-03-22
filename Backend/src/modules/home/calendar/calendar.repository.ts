import { database } from "../../../config/prisma";
import * as fs from "fs/promises"
import * as path from "path"
import { logger } from "../../../utils/logger";

export const getCalendarRepository = async () => {
    try {
        return await database.calendarConfig.findMany({
            include: {
                file: true
            }
        })
    } catch (error) {
        logger.error(
            { error, operation: "getCalendarRepository", entity: "Calendar" },
            "Error fetching calendar"
        )
        throw new Error("Error al obtener el calendario");
    }
}

export const getCalendarByIdRepository = async (id: string) => {
    try {
        return await database.calendarConfig.findUnique({
            where: { id },
            include: {
                file: true
            }
        })
    } catch (error) {
        logger.error(
            { error, operation: "getCalendarByIdRepository", entity: "Calendar" },
            "Error fetching calendar by ID"
        )
        throw new Error("Error al obtener el calendario por ID")
    }
}

////////////
// UPDATE //
////////////

interface PutCalendarRepositoryProps {
    id: string;
    title: string;
    color: string;
    icon: string;
    year: number;
    description: string;
    file?: {   // 👈 ahora sí consistente
        name: string;
        path: string;
        size: number;
        mimeType: string;
    }
}

export const putCalendarRepository = async ({
    id, file, title, description, icon, color, year
}: PutCalendarRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {

            const current = await tx.calendarConfig.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Calendario no encontrado")
            }

            let fileId = current.fileId
            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (file) {
                if (current.file?.path) {
                    try {
                        await fs.unlink(path.join(uploadsPath, current.file.path))
                    } catch (error) {
                        logger.error(
                            {
                                error,
                                operation: "putCalendarRepository.unlink",
                                entity: "File"
                            },
                            "Error deleting physical file"
                        )
                    }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    })
                }

                const createdFile = await tx.file.create({
                    data: file
                })

                fileId = createdFile.id
            }

            return await tx.calendarConfig.update({
                where: { id },
                data: {
                    title,
                    description,
                    icon,
                    color,
                    year,
                    fileId
                },
                include: { file: true }
            })
        })
    } catch (error) {
        logger.error(
            { error, operation: "putCalendarRepository", entity: "Calendar" },
            "Error updating calendar"
        )
        throw new Error("Error al actualizar el calendario")
    }
}