import { Router } from "express";
import * as controller from "./juristics.controller"
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