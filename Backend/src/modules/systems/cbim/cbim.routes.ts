import { Router } from "express";
import * as controller from "./cbim.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

const router: Router = Router()

router.get(
    "/",
    controller.getCbimController

)
router.post(
    "/",
    authMiddleware,
    requirePermission("cbim.create"),
    controller.postCbimController
)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("cbim.update"),
    controller.putCbimController
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("cbim.delete"),
    controller.deleteCbimController
)

export default router;