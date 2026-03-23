import { Router } from "express";
import * as controller from "./system.controller"
import * as multer from "multer";
import * as path from "path";
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
import { sanitizeFileName } from "../../utils/file";

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../uploads"),
    filename: (req, file, cb) => {
        const safeName = sanitizeFileName(file.originalname);

        const storedName =
            crypto.randomUUID() + "-" + safeName;

        cb(null, storedName);
    }
});

export const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Solo PDF"));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

router.get("/", controller.getSystemsController)
router.put("/:id", upload.single("file"), controller.putSystemController)
router.post("/", upload.single("file"), controller.postSystemController)
router.delete("/:id", controller.deleteSystemController)

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