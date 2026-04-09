import { Router } from "express";
import * as controller from "./calendar.controller"
import { authMiddleware } from "../../../middleware/auth.middleware";
import { requirePermission } from "../../../middleware/permission.middleware";
import { createUploader } from "../../../config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get("/", controller.getCalendarController)
router.put(
    "/:id",
    authMiddleware,
    requirePermission("calendar.update"),
    upload.single("file"),
    controller.putCalendarController
)

export default router;