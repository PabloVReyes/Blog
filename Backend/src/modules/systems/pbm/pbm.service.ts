import * as repo from "./pbm.repository"
import { sanitizeFileName } from "../../../utils/file";
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import * as schema from "./pbm.schema"
import * as type from "./pbm.types"
import { logger } from "../../../utils/logger";
import { HttpError } from "@/utils/httpError";

////////////
// CREATE //
////////////

export const postPbmService = async (dto: type.PbmCreateDto) => {
    const { title, file } = dto

    if (!file) {
        throw new HttpError(400, "Archivo requerido")
    }

    return await repo.postPbmRepository({
        title,
        file:
            file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    })
}

//////////
// READ //
//////////

export const getPBMService = async (dto: schema.GetPBMSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination()

    const { data, total } = await repo.getPBMRepository({
        skip,
        take,
        search,
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

////////////
// UPDATE //
////////////

export const putPBMService = async (id: string, dto: type.PbmUpdateDto) => {
    const { title, file } = dto

    const existingItem = await repo.getPBMByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "El algoritmo PBM no existe")
    }

    const props = {
        id,
        title,
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

    return await repo.putPBMRepository(props)
}

////////////
// DELETE //
////////////

export const deletePBMService = async (id: string) => {
    const PBM = await repo.getPBMByIdRepository(id)

    if (!PBM) {
        throw new HttpError(404, "El algoritmo PBM no existe")
    }

    return await repo.deletePBMRepository(id)
}