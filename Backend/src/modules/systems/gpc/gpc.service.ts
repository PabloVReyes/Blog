import { sanitizeFileName } from "../../../utils/file";
import * as repo from "./gpc.repository"
import * as schema from "./gpc.schema";
import * as type from "./gpc.types";
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import { logger } from "../../../utils/logger";
import { HttpError } from "@/utils/httpError";

////////////
// CREATE //
////////////

export const postCycleService = async (dto: schema.PostCycleSchema) => {
    const { name } = dto

    return await repo.postCycleRepository({ name })
}

export const postGpcService = async (dto: type.GpcCreateDto) => {
    const { title, description, orderIndex, cycle, file } = dto

    return await repo.postGpcRepository({
        title,
        description,
        cycle,
        orderIndex,
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

export const getCycleService = async () => {
    const { data, total } = await repo.getCycleRepository()
    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

export const getGpcService = async (dto: schema.GetGpcSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getGpcRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getCycleWithGpcService = async (dto: schema.GetGpcSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCycleWithGpcRepository({
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

export const putGpcService = async (id: string, dto: type.GpcUpdateDto) => {
    const { title, description, cycle, orderIndex, file } = dto

    const existingItem = await repo.getGpcByIdRepositoy(id)

    if (!existingItem) {
        throw new HttpError(404, "El algoritmo no existe")
    }

    const props = {
        id,
        title,
        description,
        cycle,
        orderIndex,
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

    return await repo.putGpcRepository(props)
}

////////////
// DELETE //
////////////

export const deleteGpcService = async (id: string) => {
    const GPC = await repo.getGpcByIdRepositoy(id)

    if (!GPC) {
        throw new HttpError(404, "El algoritmo no existe")
    }

    return await repo.deleteGpcRepository(id)
}