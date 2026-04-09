import { buildPaginationMeta, getPagination } from "../../../utils/pagination"
import * as repo from "./accesscard.repository"
import { GetAccessCardSchema } from "./accesscard.schema"
import { sanitizeFileName } from "../../../utils/file"
import { AccessCardCreateDto, AccessCardUpdateDto } from "./accesscard.types"
import { HttpError } from "../../../utils/httpError"

////////////
// CREATE //
////////////

export const postAccessCardService = async (dto: AccessCardCreateDto) => {
    const { title, description, sectionId, type, url, icon, color, isActive, file } = dto

    if (type === "file" && !file) {
        throw new HttpError(400, "El archivo es requerido");
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
        meta: buildPaginationMeta(total, page, limit)
    }
}

////////////
// UPDATE //
////////////

export const putAccessCardService = async (id: string, dto: AccessCardUpdateDto) => {
    const { title, description, type, url, icon, color, isActive, file } = dto

    const existingItem = await repo.getAccessCardByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "El Acceso Rapido no existe")
    }

    if (type === "file" && !file) {
        throw new HttpError(400, "El archivo es requerido")
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
        throw new HttpError(404, "El Acceso Rapido no existe")
    }

    await repo.deleteAccessCardRepository(id)

    return true
}