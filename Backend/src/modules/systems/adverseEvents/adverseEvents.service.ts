import { sanitizeFileName } from "../../../utils/file"
import * as repo from "./adverseEvents.repository"

export const getAdverseEventsService = async () => {
    const { data, total } = await repo.getAdverseEventsRepository()

    return {
        data,
        meta: {
            total
        }
    }
}

////////////
// UPDATE //
////////////

export const putAdverseEventService = async (id: string, file?: Express.Multer.File) => {
    const AdverseEvent: any = await repo.getAdverseEventsByIdRepository(id)

    if (file) {
        if (AdverseEvent.filePath) {
            try {
                if (AdverseEvent.filePath) {
                    const fs = await import("fs/promises");
                    await fs.unlink(AdverseEvent.filePath).catch(() => { });
                }


            } catch (error) {
                console.error("Error eliminando archivo anterior:", error);
            }
        }
    }

    return await repo.putAdverseEvent({
        id,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.path ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null
    })
}

export const deleteAdverseEventService = async (id: string) => {
    const AdverseEvent = await repo.getAdverseEventsByIdRepository(id)

    if (!AdverseEvent) {
        throw new Error("Evento adverso no guardado")
    }

    if (!AdverseEvent.filePath) {
        throw new Error("Archivo no encontrado")
    }

    if (AdverseEvent.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(AdverseEvent.filePath).catch(() => { });
    }

    return await repo.putAdverseEvent({
        id,
        fileName: null,
        filePath: null,
        fileSize: null,
        mimeType: null,
    })
}

export const downloadAdverseEventsFileService = async (type: string) => {
    const AdverseEvent: any = await repo.getAdverseEventsByTypeRepository(type)


    const { fileName, filePath } = AdverseEvent

    return {
        filePath: filePath,
        fileName: fileName
    }
}