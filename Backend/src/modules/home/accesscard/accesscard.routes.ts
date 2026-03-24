import { Router } from "express";
import * as controller from "./accesscard.controller"
import multer from "multer";
import path from "path";
import { sanitizeFileName } from "../../../utils/file";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../../uploads"),
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

router.get("/", controller.getAccessCardController)
router.post("/", upload.single("file"), controller.postAccessCardController)
router.put("/:id", upload.single("file"), controller.putAccessCardController)
router.delete("/:id", controller.deleteAccessCardController)

export default router;