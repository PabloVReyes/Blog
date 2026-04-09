import { HttpError } from "../../../utils/httpError"
import { sanitizeFileName } from "../../../utils/file"
import { buildPaginationMeta } from "../../../utils/pagination"
import * as repo from "./adverseEvents.repository"

export const getAdverseEventsService = async () => {
    const { data, total } = await repo.getAdverseEventsRepository()

    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

////////////
// UPDATE //
////////////

export const putAdverseEventService = async (id: string, file?: Express.Multer.File) => {
    const existingItem = await repo.getAdverseEventsByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "El evento adverso no existe")
    }

    const props = {
        id,
        file:
            file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    }

    return await repo.putAdverseEvent(props)
}

export const deleteAdverseEventService = async (id: string) => {
    const AdverseEvent = await repo.getAdverseEventsByIdRepository(id)

    if (!AdverseEvent) {
        throw new HttpError(404, "Evento adverso no encontrado")
    }

    return await repo.deleteAdverseEventRepository(id)
}