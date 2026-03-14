import * as controller from "./search.controller";
import { Router } from "express";

const router: Router = Router()

router.get("/", controller.getSearchContoller)

export default router;