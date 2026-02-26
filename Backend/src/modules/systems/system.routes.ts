import { Router } from "express";
import * as controller from "./system.controller"
import multer from "multer";
import path from "path";
import { sanitizeFileName } from "@/routes/macroprocess.routes";
import cie10Rutes from "./cie10/cie10.routes"
import monthlyReportsRoutes from "./monthlyReports/monthlyReports.routes"
import agreementPersonRoutes from "./agreementPerson/agreementPerson.routes"
import cbimRoutes from "./cbim/cbim.routes"
import clinicalPracticeGuidelinesRoutes from "./clinicalPracticeGuidelines/clinicalPracticeGuidelines.routes"
import pbmRoutes from "./pmb/pbm.routes"
import gpcRoutes from "./gpc/gpc.routes"
import careProtocolsRoutes from "./careProtocols/careProtocols.routes"
import codesRoutes from "./codes/codes.routes"

const router: Router = Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../../uploads/systems"),
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
        fileSize: 5 * 1024 * 1024,
    }
});

router.get("/", controller.getSystemsController)
router.get("/:id/download", controller.downloadSystemFileController)
router.put("/:id", upload.single("file"), controller.puySystemController)
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

export default router;