import { sanitizeFileName } from "../../utils/file"
import * as schema from "./juristics.schema"
import * as repo from "./juristics.repository"
import * as types from "./juristics.types"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"

////////////
// CREATE //
////////////

export const postJuristicService = async (dto: types.JuristicsCreateDto) => {
    const { name, description, isNew, file } = dto

    return await repo.postJuristicsRepository({
        name,
        description: description ?? null,
        isNew,
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

export const getJuristicsService = async (dto: schema.GetJuristicsSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getJuristicsRepository({
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

export const putJuristicService = async (id: string, dto: types.JuristicsUpdateDto) => {
    const { name, description, isNew, file } = dto

    const existingItem = await repo.getJuristicsByIdRepository(id)

    if (!existingItem) {
        throw new Error("El disposicion juridica no existe")
    }

    const props = {
        id,
        name,
        description: description ?? null,
        isNew,
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

    return await repo.putJuristicsRepository(props)
}

////////////
// DELETE //
////////////

export const deleteJuristicsService = async (id: string) => {
    const Juristics = await repo.getJuristicsByIdRepository(id)

    if (!Juristics) {
        throw new Error("Descarga no encontrada")
    }

    await repo.deleteJuristicsRepository(id)
}