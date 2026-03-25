import { Router } from "express";
import * as controller from "./pbm.controller"
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

router.get("/", controller.getPBMController)
router.post(
    "/",
    authMiddleware,
    requirePermission("pbm.create"),
    upload.single("file"),
    controller.postPbmController
)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("pbm.update"),
    upload.single("file"),
    controller.putPBMController
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("pbm.delete"),
    controller.deletePBMController
)

export default router;