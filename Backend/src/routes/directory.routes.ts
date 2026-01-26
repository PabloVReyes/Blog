import { getDirectoryController } from "@/controllers/directory.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", getDirectoryController)

export default router