import * as schema from "./uveh.schema"
import * as repo from "./uveh.repository"
import * as types from "./uveh.types"
import { sanitizeFileName } from "../../utils/file"
import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import * as path from "path"
import { uploadsRoot } from "./path"
import { logger } from "../../utils/logger"

///
// CREATE //
//

export const postDownloadService = async (dto: types.DownloadsCreateDto) => {
    const { name, description, isNew, category, file } = dto

    await repo.postDownloadRepository({
        name,
        description: description ?? null,
        isNew,
        categoryId: category,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.filename ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })
}

export const postCategoryService = async (dto: schema.PostCategorySchema) => {
    const { name } = dto
    return await repo.postCategoryRepository(name)
}

//
// READ //
//

export const getCategoriesService = async () => {
    const { data, total } = await repo.getCategoriesRepository()

    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

export const getCategoriesWithDownloadsService = async (dto: schema.GetCategoryWithDownloadsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCategoriesWithDownloadsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getDownloadsService = async (dto: schema.GetDownloadsSchema) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

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

//
// UPDATE
// 

export const putDownloadService = async (id: number, dto: types.DownloadsUpdateDto) => {
    const { name, description, isNew, category, file } = dto

    const download: any = await repo.getDownloadByIdRepository(id)

    const props: any = {
        id,
        name,
        description: description ?? null,
        isNew,
        categoryId: category
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
                logger.warn({ error }, "File deletion failed")
            }
        }

        props.fileName = sanitizeFileName(file.originalname);
        props.filePath = file.filename;
        props.fileSize = file.size;
        props.mimeType = file.mimetype;
    }

    return await repo.putDownloadRepository(props)
}

///
// DELETE 
//

export const deleteDownloadService = async (id: number) => {
    const download = await repo.getDownloadByIdRepository(id)

    if (!download) {
        throw new Error("Descarga no encontrada")
    }

    if (download.filePath) {
        const obsolutePath = path.join(uploadsRoot, download.filePath)
        const fs = await import("fs/promises");
        await fs.unlink(obsolutePath).catch(() => { });
    }

    await repo.deleteDownloadRepository(id)
}