import { Router } from "express";
import * as controller from "./alert.controller"

const router: Router = Router()

router.get("/", controller.getAlertController)
router.put("/:id", controller.putAlertController)

export default router;