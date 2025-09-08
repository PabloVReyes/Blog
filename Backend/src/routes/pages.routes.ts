import { getPageController, getPagesController, publishPageController } from "@/controllers/pages.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/', getPagesController)
router.post('/publish', publishPageController)
router.get("/:slug", getPageController)

export default router;