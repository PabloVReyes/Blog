import { ClinicalPracticeGuidelinesCreateDto, ClinicalPracticeGuidelinesUpdateDto } from "./clinicalPracticeGuidelines.types";
import * as repo from "./clinicalPracticeGuidelines.repository"
import { GetClinicalPracticeGuidelinesScheme, PostCategorySchema } from "./clinicalPracticeGuidelines.scheme";
import { sanitizeFileName } from "@/utils/file";
import { getPagination } from "@/utils/pagination";

////////////
// CREATE //
////////////

export const postClinicalPracticeGuidelinesService = async (dto: ClinicalPracticeGuidelinesCreateDto) => {
    const { title, code, category, er, rr } = dto

    return await repo.postClinicalPracticeGuidelinesReporisory({
        code,
        title,
        category,
        fileNameER: er?.originalname ? sanitizeFileName(er.originalname) : null,
        filePathER: er?.path ?? null,
        fileSizeER: er?.size ?? null,
        mimeTypeER: er?.mimetype ?? null,
        fileNameRR: rr?.originalname ? sanitizeFileName(rr.originalname) : null,
        filePathRR: rr?.path ?? null,
        fileSizeRR: rr?.size ?? null,
        mimeTypeRR: rr?.mimetype ?? null,
    })
}

export const postCategoryService = async (dto: PostCategorySchema) => {
    const { name } = dto

    return await repo.postCategoryRepository(name)
}

//////////
// READ //
//////////

export const getClinicalPracticeGuidelinesService = async (dto: GetClinicalPracticeGuidelinesScheme) => {
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

export const getCategoryService = async () => {
    const { data, total } = await repo.getCategoryRepository()

    return {
        data,
        meta: {
            total,
        }
    }
}

export const downloadClinicalPracticeGuidelinesFileService = async (id: string, type: string) => {
    const ClinicalPracticeGuideline = await repo.getClinicalPracticeGuidelineByIdRepository(id)

    if (type === "ER" && !ClinicalPracticeGuideline || !ClinicalPracticeGuideline.fileNameER) {
        throw new Error("Guia de Evidencias y Recomendaciones no encontrada")
    }

    if (type === "RR" && !ClinicalPracticeGuideline || !ClinicalPracticeGuideline.fileNameRR) {
        throw new Error("Guia de Referencias Rápida no encontrada")
    }

    const { fileNameER, fileNameRR, filePathER, filePathRR } = ClinicalPracticeGuideline

    return {
        filePath: type === "ER" ? filePathER : filePathRR,
        fileName: type === "ER" ? fileNameER : fileNameRR,
    }
}

////////////
// UPDATE //
////////////

export const putClinicalPracticeGuidelinesService = async (id: string, dto: ClinicalPracticeGuidelinesUpdateDto) => {
    const { title, code, category, rr, er } = dto

    const ClinicalPracticeGuideline = await repo.getClinicalPracticeGuidelineByIdRepository(id)

    const props: any = {
        id,
        code,
        title,
        category
    }

    if (er) {
        if (ClinicalPracticeGuideline.filePathER) {
            try {
                if (ClinicalPracticeGuideline.filePathER) {
                    const fs = await import("fs/promises");
                    await fs.unlink(ClinicalPracticeGuideline.filePathER).catch(() => { });
                }


            } catch (error) {
                console.error("Error eliminando archivo anterior:", error);
            }
        }

        props.fileNameER = sanitizeFileName(er.originalname);
        props.filePathER = er.path;
        props.fileSizeER = er.size;
        props.mimeTypeER = er.mimetype;
    }

    if (rr) {
        if (ClinicalPracticeGuideline.filePathRR) {
            try {
                if (ClinicalPracticeGuideline.filePathRR) {
                    const fs = await import("fs/promises");
                    await fs.unlink(ClinicalPracticeGuideline.filePathRR).catch(() => { });
                }


            } catch (error) {
                console.error("Error eliminando archivo anterior:", error);
            }
        }

        props.fileNameRR = sanitizeFileName(rr.originalname);
        props.filePathRR = rr.path;
        props.fileSizeRR = rr.size;
        props.mimeTypeRR = rr.mimetype;
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

    if (ClinicalPracticeGuideline.filePathER) {
        const fs = await import("fs/promises");
        await fs.unlink(ClinicalPracticeGuideline.filePathER).catch(() => { });
    }

    if (ClinicalPracticeGuideline.filePathRR) {
        const fs = await import("fs/promises");
        await fs.unlink(ClinicalPracticeGuideline.filePathRR).catch(() => { });
    }

    await repo.deleteClinicalPracticeGuidelinesRepository(id)

    return true
}