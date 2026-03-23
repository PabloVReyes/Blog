import * as types from "./clinicalPracticeGuidelines.types"
import * as repo from "./clinicalPracticeGuidelines.repository"
import * as schema from "./clinicalPracticeGuidelines.schema"
import { sanitizeFileName } from "../../../utils/file";
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import { logger } from "../../../utils/logger";

////////////
// CREATE //
////////////

export const postClinicalPracticeGuidelinesService = async (dto: types.ClinicalPracticeGuidelinesCreateDto) => {
    const { title, code, category, er, rr } = dto

    if (!er || !rr) {
        throw new Error("Archivos requeridos")
    }

    const props = {
        code,
        title,
        category,
        fileER:
            er
                ? {
                    name: sanitizeFileName(er.originalname),
                    path: er.filename,
                    size: er.size,
                    mimeType: er.mimetype
                }
                : null,
        fileRR:
            rr
                ? {
                    name: sanitizeFileName(rr.originalname),
                    path: rr.filename,
                    size: rr.size,
                    mimeType: rr.mimetype
                }
                : null
    }

    return await repo.postClinicalPracticeGuidelinesReporisory(props)
}

export const postCategoryService = async (dto: schema.PostCategorySchema) => {
    const { name } = dto

    return await repo.postCategoryRepository(name)
}

//////////
// READ //
//////////

export const getClinicalPracticeGuidelinesService = async (dto: schema.GetClinicalPracticeGuidelinesSchema) => {
    const { page, limit, search, categoryId } = dto
    const { skip, take } = getPagination()

    const { data, total } = await repo.getClinicalPracticeGuidelinesRepository({
        skip,
        take,
        search,
        categoryId
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getCategoryService = async () => {
    const { data, total } = await repo.getCategoryRepository()

    return {
        data,
        meta: buildPaginationMeta
    }
}

////////////
// UPDATE //
////////////

export const putClinicalPracticeGuidelinesService = async (id: string, dto: types.ClinicalPracticeGuidelinesUpdateDto) => {
    const { title, code, category, rr, er } = dto

    const existingItem = await repo.getClinicalPracticeGuidelineByIdRepository(id)

    if (!existingItem) {
        throw new Error("La guía no existe")
    }

    const props: any = {
        id,
        code,
        title,
        category,
        fileER:
            er
                ? {
                    name: sanitizeFileName(er.originalname),
                    path: er.filename,
                    size: er.size,
                    mimeType: er.mimetype
                }
                : null,
        fileRR:
            rr
                ? {
                    name: sanitizeFileName(rr.originalname),
                    path: rr.filename,
                    size: rr.size,
                    mimeType: rr.mimetype
                }
                : null
    }

    return await repo.putClinicalPracticeGuidelinesReporisory(props)
}

////////////
// DELETE //
////////////

export const daleteClinicalPracticeGuidelinesService = async (id: string) => {
    const ClinicalPracticeGuideline = await repo.getClinicalPracticeGuidelineByIdRepository(id)

    if (!ClinicalPracticeGuideline) {
        throw new Error("Guía no encontrada")
    }

    return await repo.deleteClinicalPracticeGuidelinesRepository(id)
}