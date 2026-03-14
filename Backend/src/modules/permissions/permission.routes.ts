import { Router } from "express";
import * as controller from "./permission.controller"
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";

const router: Router = Router()

router.get(
    '/', 
    authMiddleware,
    requirePermission("permissions.read"),
    controller.getPermissionsController
)

router.post(
    '/', 
    authMiddleware,
    requirePermission("permissions.create"),
    controller.postPermissionController
)

router.put(
    '/:id', 
    authMiddleware,
    requirePermission("permissions.update"),
    controller.putPermissionController
)

router.delete(
    '/:id', 
    authMiddleware,
    requirePermission("permissions.delete"),
    controller.deletePermissionController
)

export default router;