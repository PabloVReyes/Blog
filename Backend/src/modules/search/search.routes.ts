import * as controller from "./search.controller";
import { Router } from "express";

const router: Router = Router()

router.get("/", controller.getSearchController)

export default router;