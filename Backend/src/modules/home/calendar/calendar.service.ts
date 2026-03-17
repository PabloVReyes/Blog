import { sanitizeFileName } from "../../../utils/file"
import * as repo from "./calendar.repository"
import { CalendarUpdateDto } from "./calendar.schema"

//////////
// READ //
//////////

export const getCalendarService = async () => {
    const data = await repo.getCalendarRepository()
    return {
        data,
        meta: {
            total: 1
        }
    }
}

export const downloadCalendarFileService = async (id: string) => {
    const calendar: any = await repo.getCalendarByIdRepository(id)
    if (!calendar || !calendar.filePath) {
        throw new Error("Archivo no encontrado")
    }

    return {
        filePath: calendar.filePath,
        fileName: calendar.fileName
    }
}

////////////
// UPDATE //
////////////

export const putCalendarService = async (id: string, dto: CalendarUpdateDto) => {
    const { title, description, year, icon, color, file } = dto

    const calendar: any = await repo.getCalendarByIdRepository(id)

    if (!calendar) {
        throw new Error("Calendario no encontrado")
    }

    const props: any = {
        id,
        title,
        description,
        color,
        icon,
        year
    }

    // Si hay archivo, agregamos los datos
    if (file) {
        if (calendar.storedName) {
            try {
                if (calendar.filePath) {
                    const fs = await import("fs/promises");
                    await fs.unlink(calendar.filePath).catch(() => { });
                }
            } catch (error) {
                console.error("Error eliminando archivo anterior:", error);
            }
        }

        props.fileName = sanitizeFileName(file.originalname);
        props.storedName = file.filename;
        props.filePath = file.path;
        props.fileSize = file.size;
        props.mimeType = file.mimetype;
    }

    return await repo.putCalendarRepository(props)
}