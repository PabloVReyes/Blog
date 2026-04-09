import { Router } from "express";
import * as controller from "./downloads.controller"
import { createUploader } from "../../config/multer";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";

const router: Router = Router()

const upload = createUploader(['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'application/zip', 'application/x-zip-compressed', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'])

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
router.get(
    '/', 
    controller.getDownloadsController
)

router.post(
    '/', 
    authMiddleware,
    requirePermission("downloads.create"),
    upload.single("file"), 
    controller.postDownloadController
)

router.put('/:id', 
    authMiddleware, 
    requirePermission("downloads.update"), 
    upload.single("file"), 
    controller.putDownloadController
)

router.delete(
    '/:id', 
    authMiddleware, 
    requirePermission("downloads.delete"), 
    controller.deleteDownloadController
)

export default router;