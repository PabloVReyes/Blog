import { sanitizeFileName } from "../../../utils/file";
import * as repo from "./gpc.repository"
import * as schema from "./gpc.schema";
import * as type from "./gpc.types";
import { getPagination } from "../../../utils/pagination";

////////////
// CREATE //
////////////

export const postCicleService = async (dto: schema.PostCicleSchema) => {
    const { name } = dto

    return await repo.postCicleRepository({ name })
}

export const postGpcService = async (dto: type.GpcCreateDto) => {
    const { title, description, orderIndex, cicle, file } = dto

    return await repo.postGpcRepository({
        title,
        description,
        cicle,
        orderIndex,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.path ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })

}

//////////
// READ //
//////////

export const getCicleService = async () => {
    const { data, total } = await repo.getCicleRepository()
    return {
        data,
        meta: {
            total,
        }
    }
}

export const getGpcService = async (dto: schema.GetGpcSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getGpcRepository({
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

export const getCicleWithGpcService = async (dto: schema.GetGpcSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCicleWithGpcRepository({
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

export const dowloadGpcFileService = async (id: string) => {
    const GPC = await repo.getGpcByIdRepositoy(id)

    if (!GPC || !GPC.filePath) {
        throw new Error("Algoritmo no encontrado")
    }

    return {
        filePath: GPC.filePath,
        fileName: GPC.fileName
    }
}

////////////
// UPDATE //
////////////

export const putGpcService = async (id: string, dto: type.GpcUpdateDto) => {
    const { title, description, cicle, orderIndex, file } = dto

    const Gpc: any = await repo.getGpcByIdRepositoy(id)

    const props: any = {
        id,
        title,
        description,
        cicle,
        orderIndex
    }

    if (file) {
        if (Gpc.filePath) {
            try {
                if (Gpc.filePath) {
                    const fs = await import("fs/promises");
                    await fs.unlink(Gpc.filePath).catch(() => { });
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

    return await repo.putGpcRepository(props)
}

////////////
// DELETE //
////////////

export const deleteGpcService = async (id: string) => {
    const GPC = await repo.getGpcByIdRepositoy(id)

    if (!GPC) {
        throw new Error("Algoritmo no encontrada")
    }

    if (GPC.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(GPC.filePath).catch(() => { });
    }

    return await repo.deleteGpcRepository(id)
}