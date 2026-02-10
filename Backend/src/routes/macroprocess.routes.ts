import { deleteManualController, getAreasController, getAreasCountController, getAreaWithManualsController, getManualByTypeController, getManualController, getManualsTypeController, getManualsTypeCountController, getManualsWithAreaController, getManualsWithAreaCountController, putAreaController, putManualController, putManualTypeController } from "@/controllers/macroprocess.controller";
import { Router } from "express";
import multer from "multer";
import path from "path";

const router: Router = Router()

export function sanitizeFileName(original: string) {

    const ext = path.extname(original);

    const base = path
        .basename(original, ext)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-_ ]/g, "")
        .replace(/\s+/g, "_")
        .toLowerCase();

    return `${base}${ext}`;
}

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../uploads/macroprocess"),
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
        fileSize: 5 * 1024 * 1024,
    }
});

router.get('/', getManualsWithAreaController)
router.get('/count', getManualsWithAreaCountController)
router.get("/manuals", getManualsTypeController)
router.get("/manuals/count", getManualsTypeCountController)
router.get("/areas", getAreasController)
router.get("/areas/count", getAreasCountController)
router.put("/areas/:id", putAreaController)
router.put("/manuals/:id", putManualTypeController)
router.get('/manuals/:type', getManualByTypeController)
router.get('/:id', getAreaWithManualsController)
router.put("/:id", upload.single("file"), putManualController)
router.get("/:id/download", getManualController)
router.delete("/:id", deleteManualController)


export default router;