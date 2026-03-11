import { Router } from "express";
import * as controller from "./role.controller"

const router: Router = Router()

router.get('/', controller.getRolesController)

export default router;