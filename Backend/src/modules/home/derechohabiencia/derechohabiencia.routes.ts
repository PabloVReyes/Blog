import { Router } from "express";
import * as controller from "./derechohabiencia.controller"

const router: Router = Router()

router.get("/", controller.getDerechohabienciaController)
router.put("/:id", controller.putDerechohabienciaController)

export default router;