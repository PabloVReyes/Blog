import { Router } from "express";
import * as controller from "./macroprocess.controller"
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";
import { createUploader } from "../../config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

// Areas
router.get("/areas", controller.getAreasController)

router.put(
    "/areas/:id", 
    authMiddleware,
    requirePermission("macroprocessarea.update"),
    controller.putAreaController
)

// Tipos de manual
router.get(
    "/manuals",
    controller.getManualsTypeController
)

router.put(
    "/manuals/:id", 
    authMiddleware,
    requirePermission("macroprocesstype.update"),
    controller.putManualTypeController
)

router.get('/manuals/:type', controller.getManualByTypeController)

router.get('/', controller.getManualsWithAreaController)
router.get('/:id', controller.getAreaWithManualsController)

router.put(
    "/:id", 
    authMiddleware,
    requirePermission("macroprocess.update"),
    upload.single("file"), 
    controller.putManualController
)

router.delete(
    "/:id", 
    authMiddleware,
    requirePermission("macroprocess.delete"),
    controller.deleteManualController
)


export default router;