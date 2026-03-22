import { Router } from "express";
import * as controller from "./gpc.controller"
import * as multer from "multer";
import * as path from "path";
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

router.post("/algorithms", upload.single("file"), controller.postGpcController)
router.get("/algorithms", controller.getGpcController)
router.put("/algorithms/:id", upload.single("file"), controller.putGpcController)
router.delete("/algorithms/:id", controller.deleteGpcController)

router.post("/cycles", controller.postCycleController)
router.get("/cycles-algorithms", controller.getCycleWithGpcController)
router.get("/cycles", controller.getCycleController)

export default router;