import { sanitizeFileName } from "../../../utils/file";
import * as multer from "multer";
import * as path from "path";
import { Router } from "express";
import * as controller from "./careProtocols.controller"

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../../uploads/careProtocols"),
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

router.get("/categorys", controller.getCategoryController)
router.get("/categorys-protocols", controller.getCategoryWithCareProtocolsController)
router.post("/categorys", controller.postCategoryController)

router.get("/protocols", controller.getCareProtocolsController)
router.get("/protocols/:id/download", controller.downloadGpcFileController)
router.post("/protocols", upload.single("file"), controller.postCareProtocolsController)
router.put("/protocols/:id", upload.single("file"), controller.putCareProtocolsController)
router.delete("/protocols/:id", controller.deleteCareProtocolController)

export default router;
