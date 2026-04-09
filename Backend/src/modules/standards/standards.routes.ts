import { Router } from "express";
import * as controller from "./standards.controller"
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";
import { createUploader } from "../../config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

// Categorias
router.post('/categories', controller.postCategoryController)
router.get('/categories', controller.getCategoriesController)

// Descargas
router.get(
    '/',
    controller.getStandardsController
)

router.post(
    '/',
    authMiddleware,
    requirePermission("standards.create"),
    upload.single("file"),
    controller.postStandarController
)

router.put(
    '/:id',
    authMiddleware,
    requirePermission("standards.update"),
    upload.single("file"),
    controller.putStandarController
)

router.delete(
    '/:id',
    authMiddleware,
    requirePermission("standards.delete"),
    controller.deleteStandarController
)

export default router;