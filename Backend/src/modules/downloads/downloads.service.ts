import slugify from "slugify"
import * as schema from "./downloads.schema"
import * as repo from "./downloads.repository"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import * as types from "./downloads.types"
import { sanitizeFileName } from "../../utils/file"
import * as path from "path"
import { uploadsRoot } from "./path"
import { logger } from "../../utils/logger"

////////////
// CREATE //
////////////

export const postDownloadService = async (dto: types.DownloadsCreateDto) => {
    const { name, description, isNew, type, category, file } = dto

    return await repo.postDownloadRepository({
        name,
        description: description ?? null,
        isNew,
        type,
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

export const postAreaService = async (dto: schema.PostAreaSchema) => {
    const { name, icon, color } = dto
    const slug = slugify(name, { lower: true, strict: true })

    return await repo.postAreaRepository({
        name,
        icon,
        color,
        slug
    })
}

export const postSectionService = async (dto: schema.PostSectionSchema) => {
    const { name, area } = dto
    return await repo.postSectionRepository({
        name,
        areaId: area
    })
}

export const postCategoryService = async (dto: schema.PostCategorySchema) => {
    const { name, section } = dto

    return await repo.postCategoryRepository({
        name,
        sectionId: section
    })
}


//////////
// READ //
//////////

export const getDownloadsService = async (dto: schema.GetDownloadsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getDownloadsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getAreasService = async (dto: schema.GetAreaSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

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

export const getAreaWithDownloadsService = async (slug: string) => {
    return await repo.getAreaWithDownloadsRepository(slug)
}

export const getSectionsByAreaService = async (area: number) => {
    const { data, total } = await repo.getSectionByAreaRepository(
        area
    )

    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

export const getCategoriesBySectionService = async (section: number) => {
    const { data, total } = await repo.getCategoriesBySectionRepository(
        section
    )

    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

////////////
// UPDATE //
////////////

export const putDownloadService = async (id: number, dto: types.DownloadsUpdateDto) => {
    const { name, description, isNew, type, category, file } = dto

    const download: any = await repo.getDownloadByIdRepository(id)

    const props: any = {
        id,
        name,
        description,
        isNew,
        type,
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

    return await repo.putDownloadRepository(props)
}

export const putAreaService = async (id: number, dto: schema.PutAreaSchema) => {
    const { name, icon, color } = dto
    const slug = slugify(name, { lower: true, strict: true })

    return await repo.putAreaRepository({
        id,
        name,
        icon,
        color,
        slug
    })
}

////////////
// DELETE //
////////////

export const deleteAreaService = async (id: number) => {
    return repo.deleteAreaRepository(id)
}


export const deleteDownloadService = async (id: number) => {
    const download: any = await repo.getDownloadByIdRepository(id)

    if (!download) {
        throw new Error("Descarga no encontrada")
    }

    return await repo.deleteDownloadRepository(id)
}

// 242 lineas -> 214 lineas