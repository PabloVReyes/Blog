import { Router } from "express";
import * as controller from "./certification.controller"
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

// Categorias
router.get('/sections', controller.getSectionsController)
router.get('/sections-certifications', controller.getSectionWithCertificationsController)
router.post('/sections', controller.postSectionController)

// Descargas
router.get('/', controller.getCertificationsController)
router.post('/', upload.single("file"), controller.postCertificationController)
router.put('/:id', upload.single("file"), controller.putCertificationController)
router.delete('/:id', controller.deleteCertificationController)

export default router;