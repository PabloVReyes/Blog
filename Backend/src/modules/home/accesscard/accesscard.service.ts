import { getPagination } from "@/utils/pagination"
import * as repo from "./accesscard.repository"
import { GetAccessCardSchema } from "./accesscard.schema"
import { sanitizeFileName } from "@/utils/file"
import { AccessCardCreateDto, AccessCardUpdateDto } from "./accesscard.types"

////////////
// CREATE //
////////////

export const postAccessCardService = async (dto: AccessCardCreateDto) => {
    const { title, description, sectionId, type, url, icon, color, isActive, file } = dto

    const contentType: 'page' | 'file' | 'null' =
        type === 'page' ? 'page' :
            type === 'file' ? 'file' :
                'null';

    if (type === "file" && !file) {
        throw new Error("El archivo PDF es requerido");
    }

    const props = {
        title: title ?? null,
        description: description ?? null,
        sectionId,
        type: contentType,
        icon,
        color,
        isActive,

        url: contentType === 'page' ? url ?? null : null,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        storedName: file?.filename ?? null,
        filePath: file?.path ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    };

    await repo.postAccessCardRepository(props)

    return true
}

export const downloadAccessCardFileService = async (id: string) => {
    const accessCard: any = await repo.getAccessCardByIdRepository(id)

    if(!accessCard || !accessCard.filePath) {
        throw new Error("Archivo no encontrado")
    }

    return {
        filePath: accessCard.filePath,
        fileName: accessCard.fileName
    }
}

//////////
// READ //
//////////

export const getAccessCardService = async (dto: GetAccessCardSchema) => {
    const { page, limit, search, isActive } = dto
    const { skip, take } = getPagination(page, limit)


    const { data, total } = await repo.getAccessCardRepository({
        skip,
        take,
        search,
        isActive
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: page && limit * (page - 1) + 1,
            lastItem: page && Math.min(total, limit * page)
        }
    }
}

////////////
// UPDATE //
////////////

export const putAccessCardService = async (id: string, dto: AccessCardUpdateDto) => {
    const { title, description, type, url, icon, color, isActive, file } = dto

    const existingItem: any = await repo.getAccessCardByIdRepository(id)

    // 🔥 Si antes tenía archivo y ahora ya no será tipo file → eliminarlo
    if (existingItem.storedName && type !== "file") {
        try {
            if (existingItem.filePath) {
                const fs = await import("fs/promises");
                await fs.unlink(existingItem.filePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error eliminando archivo anterior:", error);
        }
    }

    // 🔥 Si es tipo file y subieron uno nuevo → eliminar el anterior
    if (existingItem.storedName && file) {
        try {
            if (existingItem.filePath) {
                const fs = await import("fs/promises");
                await fs.unlink(existingItem.filePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error reemplazando archivo anterior:", error);
        }
    }

    if (type === "file" && !file && !existingItem.storedName) {
        throw new Error("El archivo PDF es requerido");
    }

    const props = {
        title: title ?? null,
        description: description ?? null,
        id,
        type,
        icon,
        color,
        isActive,

        url: type === "page" ? url ?? null : null, // solo URL si es página
        fileName:
            type === "file"
                ? file?.originalname
                    ? sanitizeFileName(file.originalname)
                    : existingItem.fileName
                : null, // null si es "page" o "null"
        storedName: type === "file" ? file?.filename ?? existingItem.storedName : null,
        filePath: type === "file" ? file?.path ?? existingItem.filePath : null,
        fileSize: type === "file" ? file?.size ?? existingItem.fileSize : null,
        mimeType: type === "file" ? file?.mimetype ?? existingItem.mimeType : null,
    };

    const data = await repo.putAccessCardRepository(props)

    return data
}

////////////
// DELETE //
////////////

export const deleteAccessCardService = async (id: string) => {
    const accessCard: any = await repo.getAccessCardByIdRepository(id)

    if (!accessCard) {
        throw new Error("Access Card no encontrado")
    }

    if (accessCard.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(accessCard.filePath).catch(() => { });
    }

    await repo.deleteAccessCardRepository(id)

    return true
}