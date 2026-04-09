import path from "path"
import * as repo from "./files.repository"
import { HttpError } from "../../utils/httpError"

export const downloadFileService = async (id: string) => {
    const file = await repo.downloadFileRepository(id)

    if (!file || !file.path || !file.name) {
        throw new HttpError(404, "Archivo no encontrado")
    }

    const uploadsPath = path.join(process.cwd(), 'uploads')
    const filePath = path.join(uploadsPath, file.path)

    return {
        path: filePath,
        name: file.name,
        mimeType: file.mimeType
    }
}