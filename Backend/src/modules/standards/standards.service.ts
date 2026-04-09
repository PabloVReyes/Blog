import * as schema from "./standards.schema"
import * as repo from "./standards.repository"
import * as types from "./standards.types"
import { sanitizeFileName } from "../../utils/file"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import { HttpError } from "../../utils/httpError"

/// ////////
// CREATE //
////////////

export const postStandardService = async (dto: types.StandarCreateDto) => {
    const { name, description, isNew, category, file } = dto

    return await repo.postStandarRepository({
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

export const getStandardsService = async (dto: schema.GetStandardSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getStandardsRepository({
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

export const putStandardService = async (id: string, dto: types.StandarUpdateDto) => {
    const { name, description, isNew, category, file } = dto

    const existingItem = await repo.getStandarByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "La norma oficial no existe")
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

    return await repo.putStandarRepository(props)
}

////////////
// DELETE //
////////////

export const deleteStandardService = async (id: string) => {
    const standar = await repo.getStandarByIdRepository(id)

    if (!standar) {
        throw new HttpError(404, "Norma oficial no encontrada")
    }

    await repo.deleteStandarRepository(id)
}