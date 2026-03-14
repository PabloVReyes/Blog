import * as path from "path";

export const sanitizeFileName = (original: string) => {

    const ext = path.extname(original);

    const base = path
        .basename(original, ext)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-_ ]/g, "")
        .replace(/\s+/g, "_")
        .toLowerCase();

    return `${base}${ext}`;
}