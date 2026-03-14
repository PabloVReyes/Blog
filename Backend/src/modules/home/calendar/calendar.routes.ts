import { Router } from "express";
import * as controller from "./calendar.controller"
import * as multer from "multer";
import * as path from "path";
import { sanitizeFileName } from "../../../utils/file";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../../uploads/calendar"),
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

router.get("/", controller.getCalendarController)
router.get("/:id/download", controller.downloadCalendarFileController)
router.put("/:id", upload.single("file"), controller.putCalendarController)

export default router;