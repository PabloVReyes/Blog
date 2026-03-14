import { database } from "../../../config/prisma";

export const getCalendarRepository = async () => {
    try {
        return await database.calendarConfig.findMany()
    } catch (error) {
        console.error("Error en getCalendarRepository", error);
        throw new Error("Error al obtener el calendario");
    }
}

export const getCalendarByIdRepository = async (id: string) => {
    try {
        return await database.calendarConfig.findUnique({ where: { id } })
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
    fileName: string;
    storedName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
}

export const putCalendarRepository = async ({ id, fileName, storedName, filePath, fileSize, mimeType, title, description, icon, color, year }: putCalendarRepositoryProps) => {
    try {
        return await database.calendarConfig.update({
            where: { id },
            data: {
                color,
                icon,
                description,
                title,
                fileName,
                storedName,
                filePath,
                fileSize,
                mimeType,
                year
            }
        })

    } catch (error) {
        console.error("error en putCalendarRepository", error)
        throw new Error("Error al actualizar el calendario")
    }
}