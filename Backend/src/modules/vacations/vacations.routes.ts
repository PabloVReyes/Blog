import { Router } from "express";
import * as controller from "./vacations.controller"
import multer from "multer";
import { uploadsRoot } from "./path";
import { sanitizeFileName } from "@/utils/file";

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
router.post('/shifts', controller.postShiftController)
router.get('/shifts', controller.getShilftsController)
router.put('/shifts/:id', controller.putShiftController)
router.delete('/shifts/:id', controller.deleteShiftController)
router.get('/shifts-vacations', controller.getShiftWithVacationsController)

// Vacaciones
router.get('/', controller.getVacationsController)
router.get('/download/:id', controller.downloadVacationFileController)
router.post('/', upload.single("file"), controller.postVacationController)
router.put('/:id', upload.single("file"), controller.putVacationController)
router.delete('/:id', controller.deleteVacationController)

export default router;