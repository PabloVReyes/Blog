import { Router } from "express";
import * as controller from "./uveh.controller"
import multer from "multer";
import { uploadsRoot } from "./path";
import { sanitizeFileName } from "../../utils/file";

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
router.get('/categories-downloads', controller.getCategoriesWithUVEHController)

// Descargas
router.get('/', controller.getUVEHController)
router.post('/', upload.single("file"), controller.postUVEHController)
router.put('/:id', upload.single("file"), controller.putUVEHController)
router.delete('/:id', controller.deleteUVEHController)

export default router;