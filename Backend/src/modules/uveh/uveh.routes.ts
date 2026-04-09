import { Router } from "express";
import * as controller from "./uveh.controller"
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";
import { createUploader } from "../../config/multer";

const router: Router = Router()
const upload = createUploader(['application/pdf'])

// Categorias
router.post('/categories', controller.postCategoryController)
router.get('/categories', controller.getCategoriesController)
router.get('/categories-downloads', controller.getCategoriesWithUVEHController)

// Descargas
router.get('/', controller.getUVEHController)

router.post(
    '/',
    authMiddleware,
    requirePermission("uveh.create"),
    upload.single("file"),
    controller.postUVEHController
)

router.put(
    '/:id',
    authMiddleware,
    requirePermission("uveh.update"),
    upload.single("file"),
    controller.putUVEHController
)

router.delete(
    '/:id',
    authMiddleware,
    requirePermission("uveh.delete"),
    controller.deleteUVEHController
)

export default router;