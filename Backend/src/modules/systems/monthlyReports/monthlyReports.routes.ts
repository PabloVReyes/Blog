import { Router } from "express";
import * as controller from "./monthlyReports.controller"
import * as multer from "multer";
import * as path from "path";
import { sanitizeFileName } from "../../../utils/file";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../../uploads/monthlyReports"),
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

router.get("/reports/", controller.getMonthlyReportsController)
router.get("/reports/:id/download", controller.downloadMonthlyReportsController)
router.post("/reports/", upload.single("file"), controller.postMonthlyReportsController)
router.put("/reports/:id", upload.single("file"), controller.putMonthlyReportsController)
router.delete("/reports/:id", controller.deleteMonthlyReportsController)

router.get("/periods/", controller.getPeriodsController)

export default router;