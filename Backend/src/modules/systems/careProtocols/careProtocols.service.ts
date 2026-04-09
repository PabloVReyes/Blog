import { sanitizeFileName } from "../../../utils/file";
import * as repo from "./careProtocols.repository"
import { CareProtocolsCreateDto, CareProtocolsUpdateDto } from "./careProtocols.types";
import * as schema from "./careProtocols.schema";
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import { HttpError } from "../../../utils/httpError";

////////////
// CREATE //
////////////

export const postCategoryService = async (dto: schema.PostCategorySchema) => {
    const { name } = dto;
    return await repo.postCategoryRepository(name)
}

export const postCareProtocolsService = async (dto: CareProtocolsCreateDto) => {
    const { title, description, category, file } = dto

    return await repo.postCareProtocolsRepository({
        title,
        description,
        category,
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

export const getCategoryService = async () => {
    const { data, total } = await repo.getCategoryRepository()
    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

export const getCareProtocolsService = async (dto: schema.GetCareProtocolsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCareProtocolsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getCategoryWithCareProtocolsService = async (dto: schema.GetCareProtocolsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCategoryWithCareProtocolsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

////////////
// UPDATE //
////////////

export const putCareProtocolsService = async (id: string, dto: CareProtocolsUpdateDto) => {
    const { title, description, category, file } = dto

    const existingItem = await repo.getCareProtocolByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "El protocolo de atención no existe")
    }

    const props = {
        id,
        title,
        description,
        category,
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

    return await repo.putCareProtocolRepository(props)
}

////////////
// DELETE //
////////////

export const deleteCareProtocolsService = async (id: string) => {
    const Protocol = await repo.getCareProtocolByIdRepository(id)

    if (!Protocol) {
        throw new HttpError(404, "El protocolo de atención no existe")
    }

    return await repo.deleteCareProtocolsRepository(id)
}