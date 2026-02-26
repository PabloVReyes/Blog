import { Router } from "express";
import * as controller from "./codes.controller"

const router: Router = Router()

router.get("/", controller.getCodesController)
router.get("/categorys", controller.getCategorysController)

export default router;