import * as controller from "./settings.controller"
import { Router } from "express";
import { uploadFavicon } from "../../middleware/uploadFavicon.middleware"

const router: Router = Router()
router.get(
    '/', 
    controller.settingsController
)

router.put(
    '/update', 
    controller.updateSettingsController
)

router.post(
    '/upload-favicon', 
    uploadFavicon.single("favicon"), 
    controller.uploadFaviconController
)

export default router;