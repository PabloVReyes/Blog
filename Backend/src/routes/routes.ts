import { Router } from "express";
import directoryRoutes from "../modules/directory/directory.routes"
import searchRoutes from "../modules/search/search.routes"
import macroprocessRoutes from "../modules/macroprocess/macroprocess.routes"
import homeRoutes from "../modules/home/home.routes"
import systemsRoutes from "../modules/systems/system.routes"
import downloadsRoutes from "../modules/downloads/downloads.routes"
import uvehRoutes from "../modules/uveh/uveh.routes"
import standardsRoutes from "../modules/standards/standards.routes"
import juristicsRoutes from "../modules/juristics/juristics.routes"
import certificationRoutes from "../modules/certification/certification.routes"
import vacationRoutes from "../modules/vacations/vacations.routes"
import authRoutes from "../modules/auth/auth.routes"
import usersRoutes from "../modules/users/user.routes"
import rolesRoutes from "../modules/roles/role.routes"
import permissionsRoutes from "../modules/permissions/permission.routes"
import settingsRoutes from "../modules/settings/settings.routes"
import filesRoutes from "../modules/files/files.routes"

const router: Router = Router()

// Limpio
router.use("/home", homeRoutes)
router.use("/systems", systemsRoutes)
router.use("/downloads", downloadsRoutes)
router.use("/uveh", uvehRoutes)
router.use("/standards", standardsRoutes)
router.use("/juristics", juristicsRoutes)
router.use("/certification", certificationRoutes)
router.use("/macroprocess", macroprocessRoutes)
router.use("/vacation", vacationRoutes)
router.use("/directory", directoryRoutes)
router.use("/auth", authRoutes)
router.use("/users", usersRoutes)
router.use("/roles", rolesRoutes)
router.use("/permissions", permissionsRoutes)
router.use("/settings", settingsRoutes)
router.use("/search", searchRoutes)
router.use("/files", filesRoutes)

export default router;