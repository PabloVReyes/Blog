import { Router } from "express";
import * as controller from "./system.controller"
import cie10Rutes from "./cie10/cie10.routes"
import monthlyReportsRoutes from "./monthlyReports/monthlyReports.routes"
import agreementPersonRoutes from "./agreementPerson/agreementPerson.routes"
import cbimRoutes from "./cbim/cbim.routes"
import clinicalPracticeGuidelinesRoutes from "./clinicalPracticeGuidelines/clinicalPracticeGuidelines.routes"
import pbmRoutes from "./pbm/pbm.routes"
import gpcRoutes from "./gpc/gpc.routes"
import careProtocolsRoutes from "./careProtocols/careProtocols.routes"
import codesRoutes from "./codes/codes.routes"
import adverseEventsRoutes from "./adverseEvents/adverseEvents.routes"
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { createUploader } from "@/config/multer";

const router: Router = Router()

const upload = createUploader(['application/pdf'])

router.get(
    "/",
    controller.getSystemsController
)

router.post("/",
    authMiddleware,
    requirePermission("system.create"),
    upload.single("file"),
    controller.postSystemController
)

router.put(
    "/:id",
    authMiddleware,
    requirePermission("system.update"),
    upload.single("file"),
    controller.putSystemController
)

router.delete(
    "/:id",
    authMiddleware,
    requirePermission("system.delete"),
    controller.deleteSystemController
)

router.use("/cie-10", cie10Rutes)
router.use("/monthly-reports", monthlyReportsRoutes)
router.use("/agreement-person", agreementPersonRoutes)
router.use("/cbim", cbimRoutes)
router.use("/clinical-practice-guidelines", clinicalPracticeGuidelinesRoutes)
router.use("/pbm", pbmRoutes)
router.use("/gpc", gpcRoutes)
router.use("/care-protocols", careProtocolsRoutes)
router.use("/codes", codesRoutes)
router.use("/adverse-events", adverseEventsRoutes)

export default router;