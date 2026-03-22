import { sanitizeFileName } from "../../utils/file";
import * as repo from "./macroprocess.repository"
import { buildPaginationMeta, getPagination } from "../../utils/pagination";
import * as path from "path";
import { uploadsRoot } from "./path";
import * as schema from "./macroprocess.schema"
import { logger } from "../../utils/logger";

//////////
// READ //
//////////

export const getAreaWithManualsService = async (id: string) => {
    return await repo.getAreaWithManualsRepository(id)
}

export const getManualByTypeService = async (type: string) => {
    return await repo.getManualByTypeRepository(type)
}

export const getManualsWithAreaService = async (dto: schema.GetManualsWithAreaSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getManualsWithAreaRepository({
        search,
        skip,
        take
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getManualsTypeService = async (dto: schema.GetManualsTypeSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getManualsTypeRepository({
        search,
        take,
        skip
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const putManualTypeService = async (id: string, dto: schema.PutManualTypeSchema) => {
    const { code, name, color } = dto

    const props = {
        id,
        code,
        name,
        color
    }

    return await repo.putManualTypeRepository(props)
}

export const getAreasService = async (dto: schema.GetAreasSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getAreasRepository({
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

export const putManualService = async (id: string, file?: Express.Multer.File) => {
    const existingItem = await repo.getManualByIdRepository(id)

    if (!existingItem) {
        throw new Error("El manual no existe")
    }

    if (!file) {
        throw new Error("El archivo es requerido")
    }



    const props = {
        id,
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

    return await repo.putManualRepository(props)
}

export const putAreaService = async (req: any) => {
    const { id } = req.params
    const { name } = req.body

    return await repo.putAreaRepository({
        id,
        name
    })
}

////////////
// DELETE //
////////////

export const deleteManualService = async (id: string) => {
    const manual = await repo.getManualByIdRepository(id)

    if (!manual) {
        throw new Error("Manual no encontrado")
    }

    return await repo.deleteManualRepository(id)
}