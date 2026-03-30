import * as schema from "./uveh.schema"
import * as repo from "./uveh.repository"
import * as types from "./uveh.types"
import { sanitizeFileName } from "../../utils/file"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import { HttpError } from "@/utils/httpError"

////////////
// CREATE //
////////////

export const postUVEHService = async (dto: types.DownloadsCreateDto) => {
    const { name, description, isNew, category, file } = dto

    await repo.postUVEHRepository({
        name,
        description: description ?? null,
        isNew,
        categoryId: category,
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

export const postCategoryService = async (dto: schema.PostCategorySchema) => {
    const { name } = dto
    return await repo.postCategoryRepository(name)
}

//////////
// READ //
//////////

export const getCategoriesService = async () => {
    const { data, total } = await repo.getCategoriesRepository()

    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

export const getCategoriesWithUVEHService = async (dto: schema.GetCategoryWithDownloadsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCategoriesWithUVEHRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getUVEHService = async (dto: schema.GetDownloadsSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getUVEHRepository({
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

export const putUVEHService = async (id: string, dto: types.DownloadsUpdateDto) => {
    const { name, description, isNew, category, file } = dto

    const existingItem = await repo.getUVEHByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "UVEH no existe")
    }

    const props = {
        id,
        name,
        description: description ?? null,
        isNew,
        categoryId: category,
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

    return await repo.putUVEHRepository(props)
}

////////////
// DELETE //
////////////

export const deleteUVEHService = async (id: string) => {
    const uveh = await repo.getUVEHByIdRepository(id)

    if (!uveh) {
        throw new HttpError(404, "UVEH no encontrada")
    }

    await repo.deleteUVEHRepository(id)
}