import { getPagination } from "../../../utils/pagination"
import * as repo from "./accesscard.repository"
import { GetAccessCardSchema } from "./accesscard.schema"
import { sanitizeFileName } from "../../../utils/file"
import { AccessCardCreateDto, AccessCardUpdateDto } from "./accesscard.types"

////////////
// CREATE //
////////////

export const postAccessCardService = async (dto: AccessCardCreateDto) => {
    const { title, description, sectionId, type, url, icon, color, isActive, file } = dto

    if (type === "file" && !file) {
        throw new Error("El archivo PDF es requerido");
    }

    const props = {
        title,
        description,
        sectionId,
        type,
        icon,
        color,
        isActive,

        url: type === 'page' ? url ?? null : null,

        file:
            type === "file" && file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    };

    await repo.postAccessCardRepository(props)

    return true
}

export const downloadAccessCardFileService = async (id: string) => {
    const accessCard: any = await repo.getAccessCardByIdRepository(id)

    if (!accessCard || !accessCard.filePath) {
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
            firstItem: (page && limit) && limit * (page - 1) + 1,
            lastItem: (page && limit) && Math.min(total, limit * page)
        }
    }
}

////////////
// UPDATE //
////////////

export const putAccessCardService = async (id: string, dto: AccessCardUpdateDto) => {
    const { title, description, type, url, icon, color, isActive, file } = dto

    const existingItem = await repo.getAccessCardByIdRepository(id)

    if (!existingItem) {
        throw new Error("El Acceso Rapido no existe")
    }

    if (type === "file" && !file) {
        throw new Error("El archivo es requerido")
    }

    const props = {
        title,
        description,
        id,
        type,
        icon,
        color,
        isActive,

        url: type === "page" ? url ?? null : null, 
        file:
            type === "file" && file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    };

    return await repo.putAccessCardRepository(props)
}

////////////
// DELETE //
////////////

export const deleteAccessCardService = async (id: string) => {
    const accessCard = await repo.getAccessCardByIdRepository(id)

    if (!accessCard) {
        throw new Error("Access Card no encontrado")
    }

    await repo.deleteAccessCardRepository(id)

    return true
}