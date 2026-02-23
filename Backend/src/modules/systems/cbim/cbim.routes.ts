import { Router } from "express";
import * as controller from "./cbim.controller"

const router: Router = Router()

router.get("/", controller.getCbimController)
router.post("/", controller.postCbimController)
router.put("/:id", controller.putCbimController)
router.delete("/:id", controller.deleteCbimController)

export default router;