import { getPagination } from "../../utils/pagination"
import * as repo from "./system.repository"
import * as schema from "./system.schema"
import * as type from "./systems.types"
import { sanitizeFileName } from "../../utils/file"

////////////
// CREATE //
////////////

export const postSystemService = async (dto: type.SystemCreateDto) => {
    const { name, acronym, description, icon, url, file, color, type } = dto

    const props = {
        acronym: acronym ?? null,
        name: name ?? null,
        description,
        color,
        icon,
        type,
        url: type === "page" ? url ?? null : null,
        fileName: file?.originalname ? sanitizeFileName(file.originalname) : null,
        storedName: file?.filename ?? null,
        filePath: file?.path ?? null,
        fileSize: file?.size ?? null,
        mimeType: file?.mimetype ?? null,
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

    const system: any = await repo.getSystemByIdRepository(id)

    if (system.storedName && type !== "file") {
        try {
            if (system.filePath) {
                const fs = await import("fs/promises");
                await fs.unlink(system.filePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error eliminando archivo anterior:", error);
        }
    }

    if (system.storedName && file) {
        try {
            if (system.filePath) {
                const fs = await import("fs/promises");
                await fs.unlink(system.filePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error reemplazando archivo anterior:", error);
        }
    }

    if (type === "file" && !file && !system.storedName) {
        throw new Error("El archivo PDF es requerido");
    }

    const props = {
        name: name ?? null,
        description: description ?? null,
        acronym: acronym ?? null,
        id,
        type,
        icon,
        color,

        url: type === "page" ? url ?? null : null, // solo URL si es página
        fileName:
            type === "file"
                ? file?.originalname
                    ? sanitizeFileName(file.originalname)
                    : system.fileName
                : null, // null si es "page" o "null"
        storedName: type === "file" ? file?.filename ?? system.storedName : null,
        filePath: type === "file" ? file?.path ?? system.filePath : null,
        fileSize: type === "file" ? file?.size ?? system.fileSize : null,
        mimeType: type === "file" ? file?.mimetype ?? system.mimeType : null,
    };

    return await repo.putSystemRepository(props)
}

////////////
// DELETE //
////////////

export const deleteSystemService = async (id: string) => {
    const system: any = await repo.getSystemByIdRepository(id)

    if (!system) {
        throw new Error("Sistema no encontrado")
    }

    if (system.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(system.filePath).catch(() => { });
    }

    await repo.deleteSystemRepository(id)

    return true
}