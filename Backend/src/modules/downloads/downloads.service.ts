import slugify from "slugify"
import * as scheme from "./downloads.scheme"
import * as repo from "./downloads.repository"
import { getPagination } from "@/utils/pagination"
import * as types from "./downloads.types"
import { sanitizeFileName } from "@/utils/file"
import path from "path"
import { uploadsRoot } from "./path"

////////////
// CREATE //
////////////

export const postDownloadService = async (dto: types.DownloadsCreateDto) => {
    const { name, description, isNew, type, category, file } = dto

    await repo.postDownloadRepository({
        name,
        description: description ?? null,
        isNew,
        type,
        categoryId: category,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.filename ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })
}

export const postAreaService = async (dto: scheme.PostAreaSchema) => {
    const { name, icon, color } = dto
    const slug = slugify(name, { lower: true, strict: true })

    return await repo.postAreaRepository({
        name,
        icon,
        color,
        slug
    })
}

export const postSectionService = async (dto: scheme.PostSectionScheme) => {
    const { name, area } = dto
    return await repo.postSectionRepository({
        name,
        areaId: area
    })
}

export const postCategoryService = async (dto: scheme.PostCategoryScheme) => {
    const { name, section } = dto

    return await repo.postCategoryRepository({
        name,
        sectionId: section
    })
}


//////////
// READ //
//////////

export const downloadFileService = async (id: number) => {
    const download = await repo.getDownloadByIdRepository(id)

    if (!download || !download.filePath) {
        throw new Error("Archivo no encontrado")
    }

    const obsolutePath = path.join(uploadsRoot, download.filePath)

    return {
        filePath: obsolutePath,
        fileName: download.fileName,
        mimeType: download.mimeType
    }
}

export const getDownloadsService = async (dto: scheme.GetDownloadsScheme) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getDownloadsRepository({
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
            firstItem: page && limit * (page - 1) + 1,
            lastItem: page && Math.min(total, limit * page)
        }
    }
}

export const getAreasService = async (dto: scheme.GetAreaSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getAreasRepository({
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
            firstItem: page && limit * (page - 1) + 1,
            lastItem: page && Math.min(total, limit * page)
        }
    }
}

export const getAreaWithDownloadsService = async (slug: string) => {
    return await repo.getAreaWithDownloadsRepository(slug)
}

export const getSectionsByAreaService = async (area: number) => {
    const { data, total } = await repo.getSectionByAreaRepository({
        areaId: area
    })

    return {
        data,
        meta: {
            total
        }
    }
}

export const getCategoriesBySectionService = async (section: number) => {
    const { data, total } = await repo.getCategoriesBySectionRepository({
        sectionId: section
    })

    return {
        data,
        meta: {
            total
        }
    }
}

////////////
// UPDATE //
////////////

export const putDownloadService = async (id: number, dto: types.DownloadsUpdateDto) => {
    const { name, description, isNew, type, category, file } = dto

    const download = await repo.getDownloadByIdRepository(id)

    const props: any = {
        id,
        name,
        description,
        isNew,
        type,
        categoryId: category,
    }

    if (file) {
        if (download.filePath) {
            try {
                if (download.filePath) {
                    const obsolutePath = path.join(uploadsRoot, download.filePath)
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

    return await repo.putDownloadRepository(props)
}

export const putAreaService = async (id: number, dto: scheme.PutAreaSchema) => {
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
        throw new Error("Sistema no encontrado")
    }

    if (download.filePath) {
        const obsolutePath = path.join(uploadsRoot, download.filePath)
        const fs = await import("fs/promises");
        await fs.unlink(obsolutePath).catch(() => { });
    }

    await repo.deleteDownloadRepository(id)
}