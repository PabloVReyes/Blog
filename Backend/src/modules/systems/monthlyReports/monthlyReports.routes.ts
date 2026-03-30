import { Router } from "express";
import * as controller from "./monthlyReports.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { createUploader } from "@/config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get("/reports/", controller.getMonthlyReportsController)
router.get("/periods/", controller.getPeriodsController)

router.post(
    "/reports",
    authMiddleware,
    requirePermission("monthlyreports.create"),
    upload.single("file"),
    controller.postMonthlyReportsController
)

router.put(
    "/reports/:id",
    authMiddleware,
    requirePermission("monthlyreports.update"),
    upload.single("file"),
    controller.putMonthlyReportsController
)

router.delete(
    "/reports/:id",
    authMiddleware,
    requirePermission("monthlyreports.delete"),
    controller.deleteMonthlyReportsController
)

export default router;