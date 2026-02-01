import { getSearchContoller } from "@/controllers/search.controller";
import { upload } from "@/utils/storage";
import { Router } from "express";

const router: Router = Router()

router.get("/", getSearchContoller)

export default router;