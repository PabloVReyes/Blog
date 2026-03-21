import { Router } from "express";
import * as controller from "./files.controller"

const router: Router = Router()

router.get("/download/:id", controller.downloadFile)

export default router;