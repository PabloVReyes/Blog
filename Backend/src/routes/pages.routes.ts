import { deletePageController, getPageController, getPagesController, getPagesCountController, publishPageController } from "@/controllers/pages.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/', getPagesController)
router.post('/publish', publishPageController)
router.get("/:slug", getPageController)
router.delete("/delete/:id", deletePageController)
router.get("/count", getPagesCountController)

export default router;