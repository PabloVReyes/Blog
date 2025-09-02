import { settingsController } from "@/controllers/settings.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/settings', settingsController)

export default router;