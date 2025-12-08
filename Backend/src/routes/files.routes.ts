import { deleteFileController, getFilesController, getFilesCountController } from "@/controllers/files.controller";
import { Router } from "express";

const router: Router = Router()

router.get("/", getFilesController)
router.get("/count", getFilesCountController)
router.delete("/:filename", deleteFileController)

export default router;