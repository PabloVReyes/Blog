import path from "path"
import { sanitizeFileName } from "../../../utils/file"
import * as repo from "./calendar.repository"
import { CalendarUpdateDto } from "./calendar.schema"
import { buildPaginationMeta } from "../../../utils/pagination"
import { HttpError } from "@/utils/httpError"

//////////
// READ //
//////////

export const getCalendarService = async () => {
    const data = await repo.getCalendarRepository()
    return {
        data,
        meta: buildPaginationMeta(1)
    }
}

////////////
// UPDATE //
////////////

export const putCalendarService = async (id: string, dto: CalendarUpdateDto) => {
    const { title, description, year, icon, color, file } = dto

    const calendar = await repo.getCalendarByIdRepository(id)

    if (!calendar) {
        throw new HttpError(404, "Calendario no encontrado")
    }

    const props = {
        id,
        title,
        description,
        color,
        icon,
        year,
        file: file
            ? {
                name: sanitizeFileName(file.originalname),
                path: file.filename,
                size: file.size,
                mimeType: file.mimetype
            }
            : calendar.file
    }

    return await repo.putCalendarRepository(props)
}