import { Router } from "express";
import * as controller from "./system.controller"
import multer from "multer";
import path from "path";
import { sanitizeFileName } from "@/routes/macroprocess.routes";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../uploads/systems"),
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

router.get("/", controller.getSystemsController)
router.get("/:id/download", controller.downloadSystemFileController)
router.put("/:id", upload.single("file"), controller.puySystemController)
router.post("/", upload.single("file"), controller.postSystemController)
router.delete("/:id", controller.deleteSystemController)

export default router;