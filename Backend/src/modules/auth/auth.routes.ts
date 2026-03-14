import { Router } from "express"
import * as controller from "./auth.controller"
import { loginLimiter } from "../../middleware/rateLimiter.middleware"

const router = Router()

router.post(
    "/login", 
    loginLimiter,
    controller.login
)

export default router