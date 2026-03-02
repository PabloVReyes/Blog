import { Router } from "express";
import * as controller from "./uveh.controller"
import multer from "multer";
import { sanitizeFileName } from "@/routes/macroprocess.routes";
import { uploadsRoot } from "./path";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: uploadsRoot,
    filename: (req, file, cb) => {
        const safeName = sanitizeFileName(file.originalname);

        const storedName =
            crypto.randomUUID() + "-" + safeName;

        cb(null, storedName);
    }
});

export const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
        cb(null, true);
    },
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

// Categorias
router.post('/categories', controller.postCategoryController)
router.get('/categories', controller.getCategoriesController)
router.get('/categories-downloads', controller.getCategoriesWithDownloadsController)

// Descargas
router.get('/', controller.getDownloadsController)
router.get('/download/:id', controller.downloadFileController)
router.post('/', upload.single("file"), controller.postDownloadController)
router.put('/:id', upload.single("file"), controller.putDownloadController)
router.delete('/:id', controller.deleteDownloadController)

export default router;