import { Router } from "express";
import * as controller from "./derechohabiencia.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

const router: Router = Router()

router.get("/", controller.getDerechohabienciaController)

router.put("/:id", 
    authMiddleware,
    requirePermission("derechohabiencia.update"),
    controller.putDerechohabienciaController
)

export default router;