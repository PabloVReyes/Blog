import { Router } from "express"
import * as userController from "./user.controller"

import { requirePermission } from "../../middleware/permission.middleware"
import { authMiddleware } from "../auth/auth.middleware"

const router = Router()

router.post(
    "/",
    authMiddleware,
    requirePermission("users.create"),
    userController.createUser
)

export default router