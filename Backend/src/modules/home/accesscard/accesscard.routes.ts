import { Router } from "express";
import * as controller from "./accesscard.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { createUploader } from "@/config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get("/", controller.getAccessCardController)

router.post(
    "/",
    authMiddleware,
    requirePermission("quickaccess.create"),
    upload.single("file"),
    controller.postAccessCardController
)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("quickaccess.update"),
    upload.single("file"),
    controller.putAccessCardController
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("quickaccess.delete"),
    controller.deleteAccessCardController
)

export default router;