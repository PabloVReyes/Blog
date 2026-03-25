import { sanitizeFileName } from "../../utils/file";
import { Router } from "express";
import multer from "multer";
import * as controller from "./macroprocess.controller"
import { uploadsRoot } from "./path";
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
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Solo PDF"));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

// Areas
router.get("/areas", controller.getAreasController)

router.put(
    "/areas/:id", 
    authMiddleware,
    requirePermission("macroprocessarea.update"),
    controller.putAreaController
)

// Tipos de manual
router.get(
    "/manuals",
    controller.getManualsTypeController
)

router.put(
    "/manuals/:id", 
    authMiddleware,
    requirePermission("macroprocesstype.update"),
    controller.putManualTypeController
)

router.get('/manuals/:type', controller.getManualByTypeController)

router.get('/', controller.getManualsWithAreaController)
router.get('/:id', controller.getAreaWithManualsController)

router.put(
    "/:id", 
    authMiddleware,
    requirePermission("macroprocess.update"),
    upload.single("file"), 
    controller.putManualController
)

router.delete(
    "/:id", 
    authMiddleware,
    requirePermission("macroprocess.delete"),
    controller.deleteManualController
)


export default router;