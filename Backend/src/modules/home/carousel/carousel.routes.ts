import { Router } from "express";
import * as controller from "./carousel.controller"
import { authMiddleware } from "../../../middleware/auth.middleware";
import { requirePermission } from "../../../middleware/permission.middleware";
import { createUploader } from "../../../config/multer";

const router: Router = Router()

const upload = createUploader(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])

router.get(
    "/", 
    controller.getCarouselController
)

router.post(
    "/", 
    authMiddleware,
    requirePermission("carousel.create"),
    upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), 
    controller.postCarouselController
)

router.put(
    "/:id", 
    authMiddleware,
    requirePermission("carousel.update"),
    upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), 
    controller.putCarouselController
)

router.delete(
    "/:id", 
    authMiddleware,
    requirePermission("carousel.delete"),
    controller.deleteCarouselController
)
export default router;