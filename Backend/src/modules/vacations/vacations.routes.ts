import { Router } from "express";
import * as controller from "./vacations.controller"
import multer from "multer";
import { uploadsRoot } from "./path";
import { sanitizeFileName } from "../../utils/file";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: uploadsRoot,
    filename: (req, file, cb) => {
        const safeName = sanitizeFileName(file.originalname);

        const storedName =
            crypto.randomUUID() + "-" + safeName;

        cb(null, storedName);
    }
});

export const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
        cb(null, true);
    },
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

// Turnos
router.get('/shifts-vacations', controller.getShiftWithVacationsController)
router.get('/shifts', controller.getShilftsController)

router.post(
    '/shifts',
    authMiddleware,
    requirePermission("shift.create"),
    controller.postShiftController
)

router.put(
    '/shifts/:id', 
    authMiddleware,
    requirePermission("shift.update"),
    controller.putShiftController
)

router.delete(
    '/shifts/:id', 
    authMiddleware,
    requirePermission("shift.delete"),
    controller.deleteShiftController
)

// Vacaciones
router.get('/', controller.getVacationsController)

router.post(
    '/', 
    authMiddleware,
    requirePermission("vacation.create"),
    upload.single("file"), 
    controller.postVacationController
)

router.put(
    '/:id', 
    authMiddleware,
    requirePermission("vacation.update"),
    upload.single("file"), 
    controller.putVacationController
)

router.delete(
    '/:id', 
    authMiddleware,
    requirePermission("vacation.delete"),
    controller.deleteVacationController
)

export default router;