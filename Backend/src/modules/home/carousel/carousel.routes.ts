import { Router } from "express";
import * as controller from "./carousel.controller"
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import { sanitizeFileName } from "../../../utils/file";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = "";

        if (file.fieldname === "image") {
            uploadPath = path.join(__dirname, "../../../../uploads");
        } else if (file.fieldname === "file") {
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
    limits: { fileSize: 100 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "image") {
            const allowedImages = ["image/jpeg", "image/png", "image/webp"];
            if (!allowedImages.includes(file.mimetype)) {
                return cb(new Error("Formato de imagen no permitido"));
            }
        }

        if (file.fieldname === "file") {
            if (file.mimetype !== "application/pdf") {
                return cb(new Error("El archivo debe ser PDF"));
            }
        }

        cb(null, true);
    }
});

router.get("/", controller.getCarouselController)
router.get("/:id/download", controller.downloadCarouselFileController)
router.post("/", upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), controller.postCarouselController)
router.put("/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), controller.putCarouselController)
router.delete("/:id", controller.deleteCarouselController)
export default router;