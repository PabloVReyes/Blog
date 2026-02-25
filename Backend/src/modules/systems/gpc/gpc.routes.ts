import { Router } from "express";
import * as controller from "./gpc.controller"
import multer from "multer";
import path from "path";
import { sanitizeFileName } from "@/routes/macroprocess.routes";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../../uploads/gpc"),
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

router.post("/algorithms", upload.single("file"), controller.postGpcController)
router.get("/algorithms", controller.getGpcController)
router.get("/algorithms/:id/download", controller.downloadGpcFileController)
router.put("/algorithms/:id", upload.single("file"), controller.putGpcController)
router.delete("/algorithms/:id", controller.deleteGpcController)

router.post("/cicles", controller.postCicleController)
router.get("/cicles-algorithms", controller.getCicleWithGpcController)
router.get("/cicles", controller.getCicleController)

export default router;