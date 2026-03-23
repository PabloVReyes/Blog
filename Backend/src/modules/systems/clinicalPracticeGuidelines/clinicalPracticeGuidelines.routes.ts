import { Router } from "express";
import * as controller from "./clinicalPracticeGuidelines.controller"
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs"
import { sanitizeFileName } from "../../../utils/file";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = "";

        if (file.fieldname === "er") {
            uploadPath = path.join(__dirname, "../../../../uploads");
        } else if (file.fieldname === "rr") {
            uploadPath = path.join(__dirname, "../../../../uploads");
        } else {
            return cb(new Error("Campo de archivo no válido"), "");
        }

        // 🔹 Crear carpeta automáticamente si no existe
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },


    filename: (req, file, cb) => {
        const safeName = sanitizeFileName(file.originalname);
        const storedName = crypto.randomUUID() + "-" + safeName;
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

router.post("/guides", upload.fields([{ name: "er", maxCount: 1 }, { name: "rr", maxCount: 1 }]), controller.postClinicalPracticeGuidelinesController)
router.put("/guides/:id", upload.fields([{ name: "er", maxCount: 1 }, { name: "rr", maxCount: 1 }]), controller.putClinicalPracticeGuidelinesController)
router.delete("/guides/:id", controller.deleteClinicalPracticeGuidelinesController)
router.get("/guides", controller.getClinicalPracticeGuidelinesController)
router.get("/category", controller.getCategoryController)
router.post("/category", controller.postCategoryController)

export default router;