import { Router } from "express";
import * as controller from "./gpc.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { createUploader } from "@/config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get("/algorithms", controller.getGpcController)

router.post(
    "/algorithms",
    authMiddleware,
    requirePermission("gpc.create"),
    upload.single("file"),
    controller.postGpcController
)

router.put(
    "/algorithms/:id",
    authMiddleware,
    requirePermission("gpc.update"),
    upload.single("file"),
    controller.putGpcController

)

router.delete(
    "/algorithms/:id",
    authMiddleware,
    requirePermission("gpc.delete"),
    controller.deleteGpcController
)

router.post("/cycles", controller.postCycleController)
router.get("/cycles-algorithms", controller.getCycleWithGpcController)
router.get("/cycles", controller.getCycleController)

export default router;