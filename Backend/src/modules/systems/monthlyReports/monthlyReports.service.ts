import * as repo from "./monthlyReports.repository"
import { getPagination } from "../../../utils/pagination";
import * as schema from "./monthlyReports.schema"
import * as type from "./monthlyReports.types"
import { sanitizeFileName } from "../../../utils/file";

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
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.path ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    }

    await repo.postMonthlyReportsRepository(props)

    return true
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

export const getPeriodsService = async () => {
    return repo.getPeriodsRepository()
}

export const downloadMonthlyReportFileService = async (id: string) => {
    const monthlyReport: any = await repo.getMonthlyReportByIdRepository(id)

    if (!monthlyReport || !monthlyReport.filePath) {
        throw new Error("Archivo no encontrado")
    }

    return {
        filePath: monthlyReport.filePath,
        fileName: monthlyReport.fileName
    }
}

////////////
// UPDATE //
////////////

export const putMonthlyReportsService = async (id: string, dto: type.MontghlyReportsUpdateDto) => {
    const { title, description, type, month, year, file } = dto

    const monthlyReport: any = await repo.getMonthlyReportByIdRepository(id)

    const props: any = {
        id,
        title,
        description,
        type,
        year,
        month
    }

    if (type !== "MONTHLY") {
        props.month = null
    }

    if (file) {
        if (monthlyReport.filePath) {
            try {
                if (monthlyReport.filePath) {
                    const fs = await import("fs/promises");
                    await fs.unlink(monthlyReport.filePath).catch(() => { });
                }


            } catch (error) {
                console.error("Error eliminando archivo anterior:", error);
            }
        }

        props.fileName = sanitizeFileName(file.originalname);
        props.filePath = file.path;
        props.fileSize = file.size;
        props.mimeType = file.mimetype;
    }

    return await repo.putMonthlyReportRepository(props)
}

////////////
// DELETE //
////////////

export const deleteMonthlyReportsService = async (id: string) => {
    const monthlyReport = await repo.getMonthlyReportByIdRepository(id)

    if (!monthlyReport) {
        throw new Error("Reporte no encontrado")
    }

    if (monthlyReport.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(monthlyReport.filePath).catch(() => { });
    }

    await repo.deleteMonthlyReportRepository(id)

    return true
}