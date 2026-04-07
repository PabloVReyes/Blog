import * as controller from "./settings.controller"
import { Router } from "express";
import { uploadFavicon } from "../../middleware/uploadFavicon.middleware"
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";
import { uploadFooter } from "@/middleware/uploadFooter.middleware";

const router: Router = Router()
router.get(
    '/',
    controller.settingsController
)

router.put(
    '/',
    authMiddleware,
    requirePermission("settings.update"),
    controller.updateSettingsController
)

router.post(
    '/upload-favicon',
    authMiddleware,
    requirePermission("settings.update"),
    uploadFavicon.single("favicon"),
    controller.uploadFaviconController
)

router.post(
    '/upload-footer',
    authMiddleware,
    requirePermission("settings.update"),
    uploadFooter.single("footer"),
    controller.uploadFooterController
)

export default router;