import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import * as repo from "./vacations.repository"
import * as schema from "./vacations.schema"
import * as types from "./vacations.types"
import { sanitizeFileName } from "../../utils/file"
import { HttpError } from "../../utils/httpError"

////////////
// CREATE //
////////////

export const postShiftService = async (dto: schema.PostShiftSchema) => {
    const { name, icon, color } = dto

    return await repo.postShiftRepository({
        name,
        icon,
        color
    })
}

export const postVacationService = async (dto: types.VacationsCreateDto) => {
    const { type, shift, file } = dto

    return await repo.postVacationRepository({
        type,
        shiftId: shift,
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

export const getVacationsService = async (dto: schema.GetVacationssSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getVacationsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getShiftsService = async (dto: schema.GetShiftsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getShiftsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getShiftWithVacationsService = async (dto: schema.GetShiftsWithFilesSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getShiftsWithVacationsRepository({
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

export const putShiftService = async (id: string, dto: schema.PutShiftSchema) => {
    const { name, icon, color } = dto

    return await repo.putShiftRepository({
        id,
        name,
        icon,
        color
    })
}

export const putVacationService = async (id: string, dto: types.VacationsUpdateDto) => {
    const { type, shift, file } = dto

    const existingItem = await repo.getVacationsByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "Las vacaciones no existen")
    }

    const props = {
        id,
        type,
        shiftId: shift,
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

    return await repo.putVacationsRepository(props)
}

////////////
// DELETE //
////////////

export const deleteShiftService = async (id: string) => {
    return await repo.deleteShiftRepository(id)
}

export const deleteVacationService = async (id: string) => {
    const vacation = await repo.getVacationsByIdRepository(id)

    if (!vacation) {
        throw new HttpError(404, "Vacaciones no encontradas")
    }

    return await repo.deleteVacationRepository(id)
}
