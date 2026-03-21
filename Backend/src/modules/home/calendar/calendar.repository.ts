import { database } from "../../../config/prisma";
import * as fs from "fs/promises"
import * as path from "path"

export const getCalendarRepository = async () => {
    try {
        return await database.calendarConfig.findMany({
            include: {
                file: true
            }
        })
    } catch (error) {
        console.error("Error en getCalendarRepository", error);
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
        console.error("error en getCalendarByIdRepository", error)
        throw new Error("Error al obtener el calendario por ID")
    }
}

////////////
// UPDATE //
////////////

interface putCalendarRepositoryProps {
    id: string;
    title: string;
    color: string;
    icon: string;
    year: number;
    description: string;
    file: {
        name: string;
        path: string;
        size: number;
        mimeType: string;
    }
}

export const putCalendarRepository = async ({ id, file, title, description, icon, color, year }: putCalendarRepositoryProps) => {
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

            if (file) {
                if (current.file?.path) {
                    try {
                        const uploadsPath = path.join(process.cwd(), 'uploads')
                        const absolutePath = path.join(uploadsPath, current.file.path)
                        await fs.unlink(absolutePath)
                    } catch (error) {
                        console.warn("No se pudo eliminar archivo físico:", error)
                    }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    })
                }

                const createdFile = await tx.file.create({
                    data: {
                        name: file.name,
                        path: file.path,
                        size: file.size,
                        mimeType: file.mimeType
                    }
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
        console.error("error en putCalendarRepository", error)
        throw new Error("Error al actualizar el calendario")
    }
}