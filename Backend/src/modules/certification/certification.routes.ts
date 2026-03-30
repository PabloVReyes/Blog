import { Router } from "express";
import * as controller from "./certification.controller"
import { createUploader } from "@/config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

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