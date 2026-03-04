import { Router } from "express";
import settingsRoutes from "@/routes/settings.routes"
import pagesRoutes from "@/routes/pages.routes"
import filesRoutes from "@/routes/files.routes"
import directoryRoutes from "@/routes/directory.routes"
import searchRoutes from "@/routes/search.routes"
import macroprocessRoutes from "@/modules/macroprocess/macroprocess.routes"
import homeRoutes from "@/modules/home/home.routes"
import systemsRoutes from "@/modules/systems/system.routes"
import downloadsRoutes from "@/modules/downloads/downloads.routes"
import uvehRoutes from "@/modules/uveh/uveh.routes"
import standarsRoutes from "@/modules/standars/standars.routes"
import juristicsRoutes from "@/modules/juristics/juristics.routes"
import certificationRoutes from "@/modules/certification/certification.routes"

const router: Router = Router()

router.get('/', (request, response) => {
    try {
        response.json({
            api: "Blog",
            status: "Ok"
        })
    } catch (error) {
        response.status(500).send({
            api: "Blog",
            status: "Error",
            message: error
        })
    }
})

router.use("/api/settings", settingsRoutes)
router.use("/api/pages", pagesRoutes)
router.use("/api/files", filesRoutes)
router.use("/api/directory", directoryRoutes)
router.use("/api/search", searchRoutes)

// Limpio
router.use("/api/home", homeRoutes)
router.use("/api/systems", systemsRoutes)
router.use("/api/downloads", downloadsRoutes)
router.use("/api/uveh", uvehRoutes)
router.use("/api/standars", standarsRoutes)
router.use("/api/juristics", juristicsRoutes)
router.use("/api/certification", certificationRoutes)
router.use("/api/macroprocess", macroprocessRoutes)

module.exports = router;