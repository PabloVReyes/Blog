import { Router } from "express";
import directoryRoutes from "@/modules/directory/directory.routes"
import searchRoutes from "@/modules/search/search.routes"
import macroprocessRoutes from "@/modules/macroprocess/macroprocess.routes"
import homeRoutes from "@/modules/home/home.routes"
import systemsRoutes from "@/modules/systems/system.routes"
import downloadsRoutes from "@/modules/downloads/downloads.routes"
import uvehRoutes from "@/modules/uveh/uveh.routes"
import standarsRoutes from "@/modules/standars/standars.routes"
import juristicsRoutes from "@/modules/juristics/juristics.routes"
import certificationRoutes from "@/modules/certification/certification.routes"
import vacationRoutes from "@/modules/vacations/vacations.routes"
import authRoutes from "@/modules/auth/auth.routes"
import usersRoutes from "@/modules/users/user.routes"
import rolesRoutes from "@/modules/roles/role.routes"
import permissionsRoutes from "@/modules/permissions/permission.routes"
import settingsRoutes from "@/modules/settings/settings.routes"

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


// Limpio
router.use("/api/home", homeRoutes)
router.use("/api/systems", systemsRoutes)
router.use("/api/downloads", downloadsRoutes)
router.use("/api/uveh", uvehRoutes)
router.use("/api/standars", standarsRoutes)
router.use("/api/juristics", juristicsRoutes)
router.use("/api/certification", certificationRoutes)
router.use("/api/macroprocess", macroprocessRoutes)
router.use("/api/vacation", vacationRoutes)
router.use("/api/directory", directoryRoutes)
router.use("/api/auth", authRoutes)
router.use("/api/users", usersRoutes)
router.use("/api/roles", rolesRoutes)
router.use("/api/permissions", permissionsRoutes)
router.use("/api/settings", settingsRoutes)
router.use("/api/search", searchRoutes)

export default router;