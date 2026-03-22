import { Router } from "express";
import * as controller from "./alert.controller"
import { authMiddleware } from "../../../middleware/auth.middleware";
import { requirePermission } from "../../../middleware/permission.middleware";

const router: Router = Router()

router.get("/", controller.getAlertController)
router.put("/:id", authMiddleware, requirePermission("alert.update"), controller.putAlertController)

export default router;