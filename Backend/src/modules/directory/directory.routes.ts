import { authMiddleware } from "@/middleware/auth.middleware";
import * as controller from "./directory.controller";
import { Router } from "express";
import { requirePermission } from "@/middleware/permission.middleware";

const router: Router = Router();

router.get("/", controller.getDirectoryController)

router.post(
    "/", 
    authMiddleware,
    requirePermission("directory.create"),
    controller.postDirectoryController
)

router.put("/:id", 
    authMiddleware,
    requirePermission("directory.update"),
    controller.putDirectoryController
)
router.delete("/:id", 
    authMiddleware,
    requirePermission("directory.delete"),
    controller.deleteDirectoryController
)

router.get("/levels", controller.getLevelsController)

export default router