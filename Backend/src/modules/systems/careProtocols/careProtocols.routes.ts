import { Router } from "express";
import * as controller from "./careProtocols.controller"
import { authMiddleware } from "../../../middleware/auth.middleware";
import { requirePermission } from "../../../middleware/permission.middleware";
import { createUploader } from "../../../config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get("/categorys", controller.getCategoryController)
router.get("/categorys-protocols", controller.getCategoryWithCareProtocolsController)
router.post("/categorys", controller.postCategoryController)

router.get(
    "/protocols",
    controller.getCareProtocolsController
)

router.post(
    "/protocols",
    authMiddleware,
    requirePermission("protocols.create"),
    upload.single("file"),
    controller.postCareProtocolsController
)

router.put(
    "/protocols/:id",
    authMiddleware,
    requirePermission("protocols.update"),
    upload.single("file"),
    controller.putCareProtocolsController
)

router.delete(
    "/protocols/:id",
    authMiddleware,
    requirePermission("protocols.delete"),
    controller.deleteCareProtocolController
)

export default router;
