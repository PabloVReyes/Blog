import * as repo from "./monthlyReports.repository"
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import * as schema from "./monthlyReports.schema"
import * as type from "./monthlyReports.types"
import { sanitizeFileName } from "../../../utils/file";
import { HttpError } from "../../../utils/httpError";

////////////
// CREATE //
////////////

export const postMonthlyReportsService = async (dto: type.MontghlyReportsCreateDto) => {
    const { title, description, type, month, year, file } = dto

    const props = {
        title,
        description: description ?? null,
        type,
        month: month ?? null,
        year,
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

    return await repo.postMonthlyReportsRepository(props)
}

//////////
// READ //
//////////

export const getMonthlyReportsService = async (dto: schema.GetMonthlyReportsSchema) => {
    const { page, limit, search, year } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getMonthlyReportsRepository({
        skip,
        take,
        search,
        year
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getPeriodsService = async () => {
    return repo.getPeriodsRepository()
}

////////////
// UPDATE //
////////////

export const putMonthlyReportsService = async (id: string, dto: type.MontghlyReportsUpdateDto) => {
    const { title, description, type, month, year, file } = dto

    const existingItem = await repo.getMonthlyReportByIdRepository(id)

    if (!existingItem) {
        throw new HttpError(404, "Informe mensual no existe")
    }

    const props = {
        id,
        title,
        description,
        type,
        year,
        month: type == "MONTHLY" ? month : null,
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

    return await repo.putMonthlyReportRepository(props)
}

////////////
// DELETE //
////////////

export const deleteMonthlyReportsService = async (id: string) => {
    const monthlyReport = await repo.getMonthlyReportByIdRepository(id)

    if(!monthlyReport) {
        throw new HttpError(404, "Informe mensual no encontrado")
    }
    return await repo.deleteMonthlyReportRepository(id)
}