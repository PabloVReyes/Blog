import { Router } from "express"
import * as controller from "./user.controller"

import { requirePermission } from "../../middleware/permission.middleware"
import { authMiddleware } from "../auth/auth.middleware"

const router = Router()

router.post(
    "/",
    authMiddleware,
    requirePermission("users.create"),
    controller.createUserController
)

router.get(
    "/",
    authMiddleware,
    requirePermission("users.read"),
    controller.getUsersController
)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("users.update"),
    controller.putUserController
)

router.put(
    "/reset-passwd/:id",
    authMiddleware,
    requirePermission("users.update"),
    controller.resetPasswordController
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("users.delete"),
    controller.deleteUserController
)

export default router