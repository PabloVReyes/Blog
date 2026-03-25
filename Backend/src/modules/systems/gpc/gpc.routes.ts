import { Router } from "express";
import * as controller from "./gpc.controller"
import multer from "multer";
import path from "path";
import { sanitizeFileName } from "../../../utils/file";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";


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

router.get("/algorithms", controller.getGpcController)

router.post(
    "/algorithms",
    authMiddleware,
    requirePermission("gpc.create"),
    upload.single("file"),
    controller.postGpcController
)

router.put(
    "/algorithms/:id",
    authMiddleware,
    requirePermission("gpc.update"),
    upload.single("file"),
    controller.putGpcController

)

router.delete(
    "/algorithms/:id",
    authMiddleware,
    requirePermission("gpc.delete"),
    controller.deleteGpcController
)

router.post("/cycles", controller.postCycleController)
router.get("/cycles-algorithms", controller.getCycleWithGpcController)
router.get("/cycles", controller.getCycleController)

export default router;