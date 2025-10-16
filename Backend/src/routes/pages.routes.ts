import { deletePageController, getAllPagesController, getPageController, getPagesController, getPagesCountController, publishPageController } from "@/controllers/pages.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/', getPagesController)
router.get("/page/:slug", getPageController)
router.get('/count', getPagesCountController)
router.get('/all', getAllPagesController)
router.post('/publish', publishPageController)
router.delete("/delete/:id", deletePageController)

export default router;