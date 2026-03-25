import { Router } from "express";
import * as controller from "./cie10.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

const router: Router = Router()

router.get(
    "/", 
    controller.getCie10Controller
)

router.post(
    "/", 
    authMiddleware,
    requirePermission('cie10.create'),
    controller.postCie10Controller
)

router.put(
    "/:id", 
    authMiddleware,
    requirePermission("cie10.update"),
    controller.putCie10Controller
)

router.delete(
    "/:id", 
    authMiddleware,
    requirePermission("cie10.delete"),
    controller.deleteCie10Controller
)

export default router;