import * as repo from "./pbm.repository"
import { sanitizeFileName } from "../../../utils/file";
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";
import * as schema from "./pbm.schema"
import * as type from "./pbm.types"
import { logger } from "../../../utils/logger";

////////////
// CREATE //
////////////

export const postPbmService = async (dto: type.PbmCreateDto) => {
    const { title, file } = dto

    return await repo.postPbmRepository({
        title,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.path ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })
}

//////////
// READ //
//////////

export const getPBMService = async (dto: schema.GetPBMSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination()

    const { data, total } = await repo.getPBMRepository({
        skip,
        take,
        search,
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const downloadPBMFileService = async (id: string) => {
    const PBM = await repo.getPBMByIdRepository(id)

    if (!PBM || !PBM.filePath) {
        throw new Error("Algoritmo no encontrado")
    }

    return {
        filePath: PBM.filePath,
        fileName: PBM.fileName
    }
}

////////////
// UPDATE //
////////////

export const putPBMService = async (id: string, dto: type.PbmUpdateDto) => {
    const { title, file } = dto

    const PBM: any = await repo.getPBMByIdRepository(id)

    const props: any = {
        id,
        title,
    }

    if (file) {
        if (PBM.filePath) {
            try {
                if (PBM.filePath) {
                    const fs = await import("fs/promises");
                    await fs.unlink(PBM.filePath).catch(() => { });
                }
            } catch (error) {
                logger.warn({ error }, "File deletion failed")
            }
        }

        props.fileName = sanitizeFileName(file.originalname);
        props.filePath = file.path;
        props.fileSize = file.size;
        props.mimeType = file.mimetype;
    }

    return await repo.putPBMRepository(props)
}

////////////
// DELETE //
////////////

export const daletePBMService = async (id: string) => {
    const PBM = await repo.getPBMByIdRepository(id)

    if (!PBM) {
        throw new Error("Guía no encontrada")
    }

    if (PBM.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(PBM.filePath).catch(() => { });
    }

    await repo.deletePBMRepository(id)

    return true
}