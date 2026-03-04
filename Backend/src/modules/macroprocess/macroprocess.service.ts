import { sanitizeFileName } from "@/utils/file";
import * as repo from "./macroprocess.repository"
import { getPagination } from "@/utils/pagination";
import path from "path";
import { uploadsRoot } from "./path";

export const getAreaWithManualsService = async (req: any) => {
    const { id } = req.params;
    const data = repo.getAreaWithManualsQuery(id)
    return data
}



//////////
// READ //
//////////

export const downloadManualFileService = async (req: any) => {
    const { id } = req.params
    const Standar = await repo.getManualByIdRepository(id)

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

export const getManualByTypeService = async (req: any) => {
    const { type } = req.params

    const data = await repo.getManualByTypeQuery(type)

    return data
}

export const getManualsWithAreaService = async (req: any) => {
    const { page, limit, search } = req.query
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getManualsWithAreaRepository({
        search,
        skip,
        take
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

export const getManualsWithAreaCountService = async (req: any) => {
    const { search } = req.query

    const data = repo.getManualsWithAreaCountQuery(search)

    return data
}

export const getManualsTypeService = async (req: any) => {
    const { page, limit, search } = req.query
    const { take, skip } = getPagination(page, limit)

    const { data, total } = await repo.getManualsTypeRepository({
        search,
        take,
        skip
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

export const putManualTypeService = async (req: any) => {
    const { id } = req.params
    const { code, name, color } = req.body

    const props = {
        id,
        code,
        name,
        color
    }

    const data = repo.putManualTypeQuery(props)
    return data
}

export const getAreasService = async (req: any) => {
    const { page, limit, search } = req.query
    const { take, skip } = getPagination(page, limit)

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



////////////
// UPDATE //
////////////

export const putManualService = async (req: any) => {
    const { id } = req.params
    const file = req.file

    const manual = await repo.getManualByIdRepository(id)

    const props: any = {
        id
    }

    if (file) {
        if (manual.filePath) {
            try {
                if (manual.filePath) {
                    const obsolutePath = path.join(uploadsRoot, manual.filePath)
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

export const deleteManualService = async (req: any) => {
    const { id } = req.params
    const manual = await repo.getManualByIdRepository(id)

    if (!manual) {
        throw new Error("Manual no encontrado")
    }

    if (manual.filePath) {
        const obsolutePath = path.join(uploadsRoot, manual.filePath)
        const fs = await import("fs/promises");
        await fs.unlink(obsolutePath).catch(() => { });
    }

    return await repo.putManualRepository({
        id,
        fileName: null,
        filePath: null,
        fileSize: null,
        mimeType: null
    })
}