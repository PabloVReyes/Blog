import { getPagination } from "../../utils/pagination"
import * as repo from "./vacations.repository"
import * as scheme from "./vacations.scheme"
import * as types from "./vacations.types"
import { sanitizeFileName } from "../../utils/file"
import * as path from "path"
import { uploadsRoot } from "./path"

///
//  CREATE
///

export const postShiftService = async (dto: scheme.PostShiftScheme) => {
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
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.filename ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })
}

///
// READ //
////

export const getVacationsService = async (dto: scheme.GetVacationssScheme) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getVacationsRepository({
        skip,
        take,
        search
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

export const getShiftsService = async (dto: scheme.GetShiftsScheme) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getShiftsRepository({
        skip,
        take,
        search
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

export const getShiftWithVacationsService = async (dto: scheme.GetShiftsWithFilesScheme) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getShiftsWithVacationsRepository({
        skip,
        take,
        search
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

export const downloadVacationsFileService = async (id: number) => {
    const Vacation = await repo.getVacationsByIdRepository(id)

    if (!Vacation || !Vacation.filePath) {
        throw new Error("Norma no encontrada")
    }

    const obsolutePath = path.join(uploadsRoot, Vacation.filePath)

    return {
        filePath: obsolutePath,
        fileName: Vacation.fileName,
        mimeType: Vacation.mimeType
    }
}

//
// UPDATE
//

export const putShiftService = async (id: number, dto: scheme.PutShiftScheme) => {
    const { name, icon, color } = dto

    return await repo.putShiftRepository({
        id,
        name,
        icon,
        color
    })
}

export const putVacationService = async (id: number, dto: types.VacationsUpdateDto) => {
    const { type, shift, file } = dto

    const vacations: any = await repo.getVacationsByIdRepository(id)

    const props: any = {
        id,
        type,
        shiftId: shift,
    }

    if (file) {
        if (vacations.filePath) {
            try {
                if (vacations.filePath) {
                    const obsolutePath = path.join(uploadsRoot, vacations.filePath)
                    const fs = await import("fs/promises");
                    await fs.unlink(obsolutePath).catch(() => { });
                }
            } catch (error) {
                console.error("Error eliminando archivo anterior:", error);
            }
        }

        props.fileName = sanitizeFileName(file.originalname);
        props.filePath = file.filename;
        props.fileSize = file.size;
        props.mimeType = file.mimetype;
    }

    return await repo.putVacationsRepository(props)
}

/////
// DELETE //
///

export const deleteShiftService = async (id: number) => {
    return await repo.deleteShiftRepository(id)
}

export const deleteVacationService = async (id: number) => {
    const vacation = await repo.getVacationsByIdRepository(id)

    if (!vacation) {
        throw new Error("Descarga no encontrada")
    }

    if (vacation.filePath) {
        const obsolutePath = path.join(uploadsRoot, vacation.filePath)
        const fs = await import("fs/promises");
        await fs.unlink(obsolutePath).catch(() => { });
    }

    return await repo.deleteVacationRepository(id)
}
