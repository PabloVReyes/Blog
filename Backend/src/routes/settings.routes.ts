import { settingsController, updateSettingsController, uploadFaviconController } from "@/controllers/settings.controller";
import { Router } from "express";
import multer from "multer";
import path from "path";

const router: Router = Router()
const upload = multer({
    dest: path.join(__dirname, "../../uploads"),
    limits: { fileSize: 1024 * 1024 }, // máx 1MB
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.includes("png") && !file.mimetype.includes("x-icon")) {
            return cb(new Error("Solo se permiten archivos PNG o ICO"));
        }
        cb(null, true);
    },
});


router.get('/', settingsController)
router.put('/update', updateSettingsController)
router.post('/upload-favicon', upload.single("favicon"), uploadFaviconController)
export default router;