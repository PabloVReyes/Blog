import { Router } from "express";
import settingsRoutes from "@/routes/settings.routes"
import pagesRoutes from "@/routes/pages.routes"
import filesRoutes from "@/routes/files.routes"
import directoryRoutes from "@/routes/directory.routes"
import systemsRoutes from "@/routes/systems.routes"
import searchRoutes from "@/routes/search.routes"
import macroprocessRoutes from "@/routes/macroprocess.routes"
import newRoutes from "@/modules/home/home.routes"

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
router.use("/api/systems", systemsRoutes)
router.use("/api/search", searchRoutes)
router.use("/api/macroprocess", macroprocessRoutes)

// Limpio
router.use("/api/home", newRoutes)

module.exports = router;