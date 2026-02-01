
import { deleteSystemController, getSystemsController, getSystemsCountController, postSystemController, putSystemController } from "@/controllers/systems.controller";
import { Router } from "express";

const router: Router = Router()

router.get("/", getSystemsController)
router.get("/count", getSystemsCountController)

router.post("/", postSystemController)

router.put("/:id", putSystemController)

router.delete('/:id', deleteSystemController)

export default router;