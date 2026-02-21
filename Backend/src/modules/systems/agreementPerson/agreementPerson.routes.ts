import { Router } from "express";
import * as controller from "./agreementPerson.controller"

const router: Router = Router()

router.get("/", controller.getAgreementPersonController)
router.post("/", controller.postAgreementPersonController)
router.put("/:id", controller.putAgreementPersonController)
router.delete("/:id", controller.deleteAgreementPersonController)
router.get("/persons-dependents", controller.getAgreementPersonWithDependentsController)
router.get("/groups", controller.getGroupsController)
router.get("/zones", controller.getZonesController)
router.post("/groups", controller.postGroupController)
router.post("/zones", controller.postZoneController)
// router.post("/", controller.postCie10Controller)
// router.put("/:id", controller.putCie10Controller)
// router.delete("/:id", controller.deleteCie10Controller)

export default router;