import { Router } from "express";
import * as controller from "./juristics.controller"
import { authMiddleware } from "../../middleware/auth.middleware";
import { requirePermission } from "../../middleware/permission.middleware";
import { createUploader } from "../../config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get('/', controller.getJuristicsController)

router.post('/',
    authMiddleware,
    requirePermission("juristics.create"),
    upload.single("file"),
    controller.postJuristicController
)

router.put('/:id',
    authMiddleware,
    requirePermission("juristics.update"),
    upload.single("file"),
    controller.putJuristicController
)

router.delete('/:id',
    authMiddleware,
    requirePermission("juristics.delete"),
    controller.deleteJuristicController
)

export default router;