import { Router } from "express";
import * as controller from "./cie10.controller"

const router: Router = Router()

router.get("/", controller.getCie10Controller)
router.post("/", controller.postCie10Controller)
router.put("/:id", controller.putCie10Controller)
router.delete("/:id", controller.deleteCie10Controller)

export default router;