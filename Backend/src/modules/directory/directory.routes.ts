import * as controller from "@/modules/directory/directory.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", controller.getDirectoryController)
router.post("/", controller.postDirectoryController)
router.put("/:id", controller.putDirectoryController)
router.delete("/:id", controller.deleteDirectoryController)

router.get("/levels", controller.getLevelsController)

export default router