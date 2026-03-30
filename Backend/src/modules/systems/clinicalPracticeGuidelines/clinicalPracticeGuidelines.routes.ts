import { Router } from "express";
import * as controller from "./clinicalPracticeGuidelines.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { createUploader } from "@/config/multer";

const router: Router = Router()
const upload = createUploader(['application/pdf'])

router.get("/guides", controller.getClinicalPracticeGuidelinesController)

router.post(
    "/guides",
    authMiddleware,
    requirePermission("gpccenetc.create"),
    upload.fields([{ name: "er", maxCount: 1 }, { name: "rr", maxCount: 1 }]),
    controller.postClinicalPracticeGuidelinesController
)

router.put(
    "/guides/:id",
    authMiddleware,
    requirePermission("gpccenetc.update"),
    upload.fields([{ name: "er", maxCount: 1 }, { name: "rr", maxCount: 1 }]),
    controller.putClinicalPracticeGuidelinesController
)
router.delete(
    "/guides/:id",
    authMiddleware,
    requirePermission("gpccenetc.delete"),
    controller.deleteClinicalPracticeGuidelinesController
)

router.get("/category", controller.getCategoryController)
router.post("/category", controller.postCategoryController)

export default router;