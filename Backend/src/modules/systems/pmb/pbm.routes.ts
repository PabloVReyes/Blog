import { Router } from "express";
import * as controller from "./pbm.controller"
import multer from "multer";
import path from "path";
import { sanitizeFileName } from "@/routes/macroprocess.routes";
import fs from "fs"

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../../uploads/pbm"),
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

router.post("/", upload.single("file"), controller.postPbmController)
router.put("/:id", upload.single("file"), controller.putPBMController)
router.delete("/:id", controller.deletePBMController)
router.get("/", controller.getPBMController)
router.get("/:id/download", controller.downloadPBMFileController)

export default router;