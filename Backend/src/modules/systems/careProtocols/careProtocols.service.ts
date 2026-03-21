import { sanitizeFileName } from "../../../utils/file";
import * as repo from "./careProtocols.repository"
import { CareProtocolsCreateDto, CareProtocolsUpdateDto } from "./careProtocols.types";
import * as schema from "./careProtocols.schema";
import { buildPaginationMeta, getPagination } from "../../../utils/pagination";

////////////
// CREATE //
////////////

export const postCategoryService = async (dto: schema.PostCategorySchema) => {
    const { name } = dto;
    return await repo.postCategoryRepository(name)
}

export const postCareProtocolsService = async (dto: CareProtocolsCreateDto) => {
    const { title, description, category, file } = dto

    return await repo.postCareProtocolsRepository({
        title,
        description,
        category,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        filePath: file?.path ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
    })
}

//////////
// READ //
//////////

export const getCategoryService = async () => {
    const { data, total } = await repo.getCategoryRepository()
    return {
        data,
        meta: buildPaginationMeta(total)
    }
}

export const getCareProtocolsService = async (dto: schema.GetCareProtocolsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCareProtocolsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const getCategoryWithCareProtocolsService = async (dto: schema.GetCareProtocolsSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCategoryWithCareProtocolsRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const dowloadCareProtocolFileService = async (id: string) => {
    const Protocol = await repo.getCareProtocolByIdRepository(id)

    if (!Protocol || !Protocol.filePath) {
        throw new Error("Algoritmo no encontrado")
    }

    return {
        filePath: Protocol.filePath,
        fileName: Protocol.fileName
    }
}


////////////
// UPDATE //
////////////

export const putCareProtocolsService = async (id: string, dto: CareProtocolsUpdateDto) => {
    const { title, description, category, file } = dto

    const Protocol: any = await repo.getCareProtocolByIdRepository(id)

    const props: any = {
        id,
        title,
        description,
        category
    }

    if (file) {
        if (Protocol.filePath) {
            try {
                if (Protocol.filePath) {
                    const fs = await import("fs/promises");
                    await fs.unlink(Protocol.filePath).catch(() => { });
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

    return await repo.putCareProtocolRepository(props)
}

////////////
// DELETE //
////////////

export const deleteCareProtocolsService = async (id: string) => {
    const Protocol = await repo.getCareProtocolByIdRepository(id)

    if (!Protocol) {
        throw new Error("Algoritmo no encontrada")
    }

    if (Protocol.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(Protocol.filePath).catch(() => { });
    }

    return await repo.deleteCareProtocolsRepository(id)
}