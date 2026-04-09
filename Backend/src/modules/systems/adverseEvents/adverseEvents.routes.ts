import { Router } from "express";
import * as controller from "./adverseEvents.controller"
import { authMiddleware } from "../../../middleware/auth.middleware";
import { requirePermission } from "../../../middleware/permission.middleware";
import { createUploader } from "../../../config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get("/", controller.getAdverseEventsController)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("events.update"),
    upload.single("file"),
    controller.putAdverseEventsController
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("events.delete"),
    controller.deleteAdverseEventController
)

export default router;