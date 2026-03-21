import * as repo from "./files.repository"

export const downloadFileService = async (id: string) => {
    const file = await repo.downloadFileRepository(id)

    if(!file || !file.path) {
        throw new Error("Archivo no encontrado")
    }

    return {
        path: file.path,
        name: file.name,
        mimeType: file.mimeType
    }
}