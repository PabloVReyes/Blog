import { Router } from "express";
import * as controller from "./agreementPerson.controller"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";

const router: Router = Router()

router.get("/persons-dependents", controller.getAgreementPersonWithDependentsController)
router.get("/groups", controller.getGroupsController)
router.get("/zones", controller.getZonesController)
router.post("/groups", controller.postGroupController)
router.post("/zones", controller.postZoneController)

router.get(
    "/",
    authMiddleware,
    requirePermission("agreementperson.read"),
    controller.getAgreementPersonController
)

router.post(
    "/",
    authMiddleware,
    requirePermission("agreementperson.create"),
    controller.postAgreementPersonController
)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("agreementperson.update"),
    controller.putAgreementPersonController,
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("agreementperson.delete"),
    controller.deleteAgreementPersonController
)


export default router;