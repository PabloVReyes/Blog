import { Router } from "express";
import * as controller from "./permission.controller"

const router: Router = Router()

router.get('/', controller.getPermissionsController)
router.post('/', controller.postPermissionController)
router.put('/:id', controller.putPermissionController)
router.delete('/:id', controller.deletePermissionController)

export default router;