import { Router } from "express";
import * as controller from "./juristics.controller"
import multer from "multer";
import { uploadsRoot } from "./path";
import { sanitizeFileName } from "../../utils/file";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: uploadsRoot,
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
        cb(null, true);
    },
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

router.get('/', controller.getJuristicsController)
router.post('/', upload.single("file"), controller.postJuristicController)
router.put('/:id', upload.single("file"), controller.putJuristicController)
router.delete('/:id', controller.deleteJuristicController)

export default router;