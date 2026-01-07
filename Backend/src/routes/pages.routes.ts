import { deletePageController, getAllPagesUrlController, getPageController, getPagesController, getPagesCountController, publishPageController, uploadPageImageController } from "@/controllers/pages.controller";
import { upload } from "@/utils/storage";
import { Router } from "express";

const router: Router = Router()

router.get('/', getPagesController)
router.get("/page/:slug", getPageController)
router.get('/count', getPagesCountController)
router.get('/urls', getAllPagesUrlController)

router.post('/publish', publishPageController)
router.post("/image", upload.single("image"), uploadPageImageController)

router.delete("/delete/:id", deletePageController)

export default router;