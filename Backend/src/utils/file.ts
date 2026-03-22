import * as path from "path"

const ALLOWED_EXTENSIONS = new Set([
    '.jpg', '.jpeg', '.png', '.gif', '.webp',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx',
    '.zip', '.txt', '.csv'
])

export const sanitizeFileName = (original: string): string => {
    const ext = path.extname(original).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(ext)) {
        throw new Error(`Extensión de archivo no permitida: ${ext}`)
    }
    const base = path
        .basename(original, ext)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .toLowerCase()
    return `${base}_${crypto.randomUUID()}${ext}`
}