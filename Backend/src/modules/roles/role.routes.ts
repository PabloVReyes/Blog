import { Router } from "express";
import * as controller from "./role.controller"
import { authMiddleware } from "../auth/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

const router: Router = Router()

router.get('/',
    authMiddleware,
    requirePermission("roles.read"),
    controller.getRolesController)

router.post('/', controller.postRoleController)
router.put('/:id', controller.putRoleController)
router.delete('/:id', controller.deleteRoleController)

export default router;