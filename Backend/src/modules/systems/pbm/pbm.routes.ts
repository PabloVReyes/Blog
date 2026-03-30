import { Router } from "express";
import * as controller from "./pbm.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { createUploader } from "@/config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get("/", controller.getPBMController)
router.post(
    "/",
    authMiddleware,
    requirePermission("pbm.create"),
    upload.single("file"),
    controller.postPbmController
)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("pbm.update"),
    upload.single("file"),
    controller.putPBMController
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("pbm.delete"),
    controller.deletePBMController
)

export default router;