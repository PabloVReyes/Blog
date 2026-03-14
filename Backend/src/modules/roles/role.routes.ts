import { Router } from "express";
import * as controller from "./role.controller"
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";

const router: Router = Router()

router.get(
    '/',
    authMiddleware,
    requirePermission("roles.read"),
    controller.getRolesController)

router.post(
    '/',
    authMiddleware,
    requirePermission("roles.create"),
    controller.postRoleController
)
router.put(
    '/:id',
    authMiddleware,
    requirePermission("roles.update"),
    controller.putRoleController
)

router.delete(
    '/:id',
    authMiddleware,
    requirePermission("roles.delete"),
    controller.deleteRoleController
)

export default router;