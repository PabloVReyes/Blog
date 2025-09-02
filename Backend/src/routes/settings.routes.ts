import { settingsController, updateSettingsController } from "@/controllers/settings.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/settings', settingsController)
router.put('/settings/update', updateSettingsController)

export default router;