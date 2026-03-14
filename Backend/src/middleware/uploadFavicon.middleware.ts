import * as multer from "multer"
import * as path from "path"
import * as fs from "fs"

const uploadDir = path.join(process.cwd(), "uploads")

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({

    destination: (_req, _file, cb) => {
        cb(null, uploadDir)
    },

    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()
        cb(null, `favicon${ext}`)
    }

})

const allowedMimeTypes = [
    "image/png",
    "image/x-icon",
    "image/vnd.microsoft.icon"
]

export const uploadFavicon = multer({
    storage,
    limits: {
        fileSize: 200 * 1024
    },
    fileFilter: (_req, file, cb) => {

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Solo se permiten archivos PNG o ICO"))
        }

        cb(null, true)
    }
})