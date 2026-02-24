import { PbmCreateDto, PbmUpdateDto } from "./pbm.types";
import * as repo from "./pbm.repository"
import { sanitizeFileName } from "@/utils/file";
import { getPagination } from "@/utils/pagination";
import { GetPBMScheme } from "./pbm.scheme";

////////////
// CREATE //
////////////

export const postPbmService = async (dto: PbmCreateDto) => {
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

export const getPBMService = async (dto: GetPBMScheme) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination()

    const { data, total } = await repo.getPBMRepository({
        skip,
        take,
        search,
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

export const putPBMService = async (id: string, dto: PbmUpdateDto) => {
    const { title, file } = dto

    const PBM = await repo.getPBMByIdRepository(id)

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
                console.error("Error eliminando archivo anterior:", error);
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