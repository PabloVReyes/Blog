import path from "path"
import fs from "fs"
import { formatFileSize } from "@/utils/formatFileSize";
import mime from "mime-types";

const uploadsPath = path.join(process.cwd(), "uploads");

export const getFilesService = (req: any) => {
    const { page, limit, search } = req.query
    // Leer todos los archivos del folder
    const files = fs.readdirSync(uploadsPath);

    const lowerQuery = search.toLowerCase();

    const mapped = files
        .filter(file => file.toLowerCase().includes(lowerQuery)) // ← FILTRO POR COINCIDENCIA
        .map(file => {
            const filePath = path.join(uploadsPath, file);
            const stats = fs.statSync(filePath);
            const mimeType = mime.lookup(file) || "unknown";
            const ext = path.extname(file).replace(".", "");

            return {
                filename: file,
                size: formatFileSize(stats.size),
                uploadedAt: stats.mtime,
                url: `${req.protocol}://${req.get("host")}/uploads/${file}`,
                type: ext,
                mime: mimeType
            };
        });

    // Ordenar por fecha DESC (más reciente primero)
    mapped.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

    // Paginación
    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit);

    const items = mapped.slice(start, end);

    return items
};

export const getFilesCountService = async (req: any) => {
    const { search } = req.query
    const files = fs.readdirSync(uploadsPath);
    const lowerQuery = search.toLowerCase();

    const mapped = files
        .filter(file => file.toLowerCase().includes(lowerQuery))

    return mapped.length
}

export const deleteFileService = async (req: any) => {
    const { filename } = req.params
    const filePath = path.join(uploadsPath, filename);

    if (!fs.existsSync(filePath)) {
        return { ok: false, message: "El archivo no existe" };
    }

    try {
        fs.unlinkSync(filePath);
        return { ok: true, message: "Archivo eliminado correctamente" };
    } catch (err) {
        console.error("Error eliminando archivo:", err);
        return { ok: false, message: "Error eliminando el archivo" };
    }
}