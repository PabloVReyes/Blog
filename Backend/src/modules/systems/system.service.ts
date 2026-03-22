import { buildPaginationMeta, getPagination } from "../../utils/pagination"
import * as repo from "./system.repository"
import * as schema from "./system.schema"
import * as type from "./systems.types"
import { sanitizeFileName } from "../../utils/file"

////////////
// CREATE //
////////////

export const postSystemService = async (dto: type.SystemCreateDto) => {
    const { name, acronym, description, icon, url, file, color, type } = dto

    if (type === "file" && !file) {
        throw new Error("El archivo PDF el requerido")
    }

    const props = {
        acronym: acronym ?? null,
        name: name ?? null,
        description,
        color,
        icon,
        type,
        url: type === "page" ? url ?? null : null,
        file:
            type === "file" && file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    }

    await repo.postSystemRepository(props)

    return true
}

//////////
// READ //
//////////

export const getSystemService = async (dto: schema.GetSystemSchema) => {
    const { page, limit, search } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getSystemRepository({
        skip,
        take,
        search
    })

    return {
        data,
        meta: buildPaginationMeta(total, page, limit)
    }
}

export const downloadSystemFileService = async (id: string) => {
    const system: any = await repo.getSystemByIdRepository(id)

    if (!system || !system.filePath) {
        throw new Error("Archivo no encontrado")
    }

    return {
        filePath: system.filePath,
        fileName: system.fileName
    }
}

////////////
// UPDATE //
////////////

export const putSystemService = async (id: string, dto: type.SystemUpdateDto) => {
    const { acronym, name, file, url, description, icon, type, color } = dto

    const existingItem = await repo.getSystemByIdRepository(id)

    if (!existingItem) {
        throw new Error("El sistema no existe")
    }

    if (type === "file" && !file) {
        throw new Error("El archivo es requerido")
    }

    const props = {
        name: name ?? null,
        description: description,
        acronym: acronym ?? null,
        id,
        type,
        icon,
        color,

        url: type === "page" ? url ?? null : null, // solo URL si es página
        file:
            type === "file" && file
                ? {
                    name: sanitizeFileName(file.originalname),
                    path: file.filename,
                    size: file.size,
                    mimeType: file.mimetype
                }
                : null
    };

    return await repo.putSystemRepository(props)
}

////////////
// DELETE //
////////////

export const deleteSystemService = async (id: string) => {
    const system = await repo.getSystemByIdRepository(id)

    if (!system) {
        throw new Error("Sistema no encontrado")
    }

    return await repo.deleteSystemRepository(id)
}