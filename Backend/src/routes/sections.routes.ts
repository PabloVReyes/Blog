import { getSectionsController, putSectionController } from "@/controllers/section.controller";
import { upload } from "@/utils/storage";
import { Router } from "express";

const router: Router = Router()

router.get("/", getSectionsController)
router.put("/:id", upload.single("file"), putSectionController)

export default router;