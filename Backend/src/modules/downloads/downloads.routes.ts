import { Router } from "express";
import * as controller from "./downloads.controller"
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

// Areas
router.post("/areas", controller.postDownloadAreaController)
router.get("/areas", controller.getAreasController)
router.get("/areas/:slug", controller.getAreasWithDownloadsController)
router.put("/areas/:id", controller.putAreaController)
router.delete("/areas/:id", controller.deleteAreaController)

// Secciones
router.post('/sections', controller.postSectionController)
router.get('/sections/:area', controller.getSectionsByAreaController)

// Categorias
router.post('/categories', controller.postCategoryController)
router.get("/categories/:section", controller.getCategoriesBySectionController)

// Descargas
router.get('/', controller.getDownloadsController)
router.post('/', upload.single("file"), controller.postDownloadController)
router.put('/:id', upload.single("file"), controller.putDownloadController)
router.delete('/:id', controller.deleteDownloadController)

export default router;