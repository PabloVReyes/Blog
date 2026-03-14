import { Router } from "express";
import * as controller from "./certification.controller"
import * as multer from "multer";
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
router.post('/sections', controller.postSectionController)
router.get('/sections', controller.getSectionsController)
router.get('/sections-certifications', controller.getSectionWithCertificationsController)

// Descargas
router.get('/', controller.getCertificationsController)
router.get('/download/:id', controller.downloadCertificationFileController)
router.post('/', upload.single("file"), controller.postCertificationController)
router.put('/:id', upload.single("file"), controller.putCertificationController)
router.delete('/:id', controller.deleteCertificationController)

export default router;