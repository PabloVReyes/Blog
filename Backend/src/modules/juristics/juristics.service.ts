import { sanitizeFileName } from "@/utils/file"
import * as scheme from "./juristics.scheme"
import * as repo from "./juristics.repository"
import * as types from "./juristics.types"
import { getPagination } from "@/utils/pagination"
import path from "path"
import { uploadsRoot } from "./path"

////
// CREATE //
///

export const postJuristicService = async (dto: types.JuristicsCreateDto) => {
    const { name, description, isNew, file } = dto

    return await repo.postJuristicsRepository({
        name,
        description: description ?? null,
        isNew,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.filename ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })
}

//////////
// READ //
//////////

export const getJuristicsService = async (dto: scheme.GetJuristicsScheme) => {
    const { page, limit, search } = dto
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getJuristicsRepository({
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

export const downloadJuristicFileService = async (id: number) => {
    const Juristic = await repo.getJuristicsByIdRepository(id)

    if (!Juristic || !Juristic.filePath) {
        throw new Error("Disposición Juridica no encontrada")
    }

    const obsolutePath = path.join(uploadsRoot, Juristic.filePath)

    return {
        filePath: obsolutePath,
        fileName: Juristic.fileName,
        mimeType: Juristic.mimeType
    }
}

///
// UPDATE //
////

export const putJuristicService = async (id: number, dto: types.JuristicsUpdateDto) => {
    const { name, description, isNew, file } = dto

    const Juristic = await repo.getJuristicsByIdRepository(id)

    const props: any = {
        id,
        name,
        description: description ?? null,
        isNew
    }

    if (file) {
        if (Juristic.filePath) {
            try {
                if (Juristic.filePath) {
                    const obsolutePath = path.join(uploadsRoot, Juristic.filePath)
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

    return await repo.putJuristicsRepository(props)
}

///
// DELETE //
////

export const deleteJuristicsService = async (id: number) => {
    const Juristics = await repo.getJuristicsByIdRepository(id)

    if (!Juristics) {
        throw new Error("Descarga no encontrada")
    }

    if (Juristics.filePath) {
        const obsolutePath = path.join(uploadsRoot, Juristics.filePath)
        const fs = await import("fs/promises");
        await fs.unlink(obsolutePath).catch(() => { });
    }

    await repo.deleteJuristicsRepository(id)
}