import { sanitizeFileName } from "../../../utils/file";
import * as repo from "./gpc.repository"
import * as schema from "./gpc.schema";
import * as type from "./gpc.types";
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";

////////////
// CREATE //
////////////

export const postCycleService = async (dto: schema.PostCycleSchema) => {
    const { name } = dto

    return await repo.postCycleRepository({ name })
}

export const postGpcService = async (dto: type.GpcCreateDto) => {
    const { title, description, orderIndex, cycle, file } = dto

    return await repo.postGpcRepository({
        title,
        description,
        cycle,
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

export const getCycleService = async () => {
    const { data, total } = await repo.getCycleRepository()
    return {
        data,
        meta: buildPaginationMeta(total)
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
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getCycleWithGpcService = async (dto: schema.GetGpcSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCycleWithGpcRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
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
    const { title, description, cycle, orderIndex, file } = dto

    const Gpc: any = await repo.getGpcByIdRepositoy(id)

    const props: any = {
        id,
        title,
        description,
        cycle,
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