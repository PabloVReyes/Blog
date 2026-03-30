import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { randomUUID } from 'crypto'

type AllowedMime =
    | 'application/pdf'
    | 'image/jpeg'
    | 'image/png'
    | 'image/webp'

    // ZIP
    | 'application/zip'
    | 'application/x-zip-compressed'

    // Word
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

    // Excel
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    // PowerPoint
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'

// Extensiones permitidas (backup de seguridad)
const allowedExtensions = [
    '.pdf', '.jpg', '.jpeg', '.png', '.webp',
    '.zip',
    '.doc', '.docx',
    '.xls', '.xlsx',
    '.ppt', '.pptx'
]

// Asegura que la carpeta exista
const uploadPath = path.resolve('uploads')
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

export function createUploader(allowedMimes: AllowedMime[]) {
    return multer({
        storage: multer.diskStorage({
            destination: (_req, _file, cb) => cb(null, uploadPath),
            filename: (_req, file, cb) => {
                const ext = path.extname(file.originalname).toLowerCase()
                cb(null, `${randomUUID()}${ext}`)
            }
        }),

        limits: {
            fileSize: 100 * 1024 * 1024 // 100 MB
        },

        fileFilter: (_req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase()

            const isMimeValid = allowedMimes.includes(file.mimetype as AllowedMime)
            const isExtValid = allowedExtensions.includes(ext)

            if (isMimeValid && isExtValid) {
                cb(null, true)
            } else {
                cb(new Error(`Tipo de archivo no permitido: ${file.mimetype} (${ext})`))
            }
        }
    })
}