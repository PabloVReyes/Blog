import * as schema from "./standards.schema"
import * as repo from "./standards.repository"
import * as types from "./standards.types"
import { sanitizeFileName } from "../../utils/file"
import { getPagination } from "../../utils/pagination"
import * as path from "path"
import { uploadsRoot } from "./path"

/// ////////
// CREATE //
////////////

export const postSdantardService = async (dto: types.StandarCreateDto) => {
    const { name, description, isNew, category, file } = dto

    return await repo.postStandarRepository({
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

////
// READ 
///

export const getCategoriesService = async () => {
    const { data, total } = await repo.getCategoriesRepository()

    return {
        data,
        meta: {
            total
        }
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

export const downloadStandarFileService = async (id: number) => {
    const Standar = await repo.getStandarByIdRepository(id)

    if (!Standar || !Standar.filePath) {
        throw new Error("Norma no encontrada")
    }

    const obsolutePath = path.join(uploadsRoot, Standar.filePath)

    return {
        filePath: obsolutePath,
        fileName: Standar.fileName,
        mimeType: Standar.mimeType
    }
}

////
// UPDATE
///

export const putStandardService = async (id: number, dto: types.StandarUpdateDto) => {
    const { name, description, isNew, category, file } = dto

    const standar: any = await repo.getStandarByIdRepository(id)

    const props: any = {
        id,
        name,
        description: description ?? null,
        isNew,
        categoryId: category
    }

    if (file) {
        if (standar.filePath) {
            try {
                if (standar.filePath) {
                    const obsolutePath = path.join(uploadsRoot, standar.filePath)
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

    return await repo.putStandarRepository(props)
}

///
// DELETE //
// 

export const deleteStandardService = async (id: number) => {
    const standar = await repo.getStandarByIdRepository(id)

    if (!standar) {
        throw new Error("Descarga no encontrada")
    }

    if (standar.filePath) {
        const obsolutePath = path.join(uploadsRoot, standar.filePath)
        const fs = await import("fs/promises");
        await fs.unlink(obsolutePath).catch(() => { });
    }

    await repo.deleteStandarRepository(id)
}