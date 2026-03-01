import { Router } from "express";
import * as controller from "./downloads.controller"
import multer from "multer";
import path from "path";
import { sanitizeFileName } from "@/routes/macroprocess.routes";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../../uploads/downloads"),
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

// Areas
router.post("/areas", controller.postDownloadAreaController)
router.get("/areas", controller.getAreasController)
router.get("/areas/:slug", controller.getAreasWithDownloadsController)
router.put("/areas/:id", controller.putAreaController)
router.delete("/areas/:id", controller.deleteAreaController)

export default router;