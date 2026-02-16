import { Router } from "express";
import carouselRoutes from "./carousel/carousel.routes"
import alertRoutes from "./alert/alert.routes"
import calendarRoutes from "./calendar/calendar.routes"
import derechohabienciaRoutes from "./derechohabiencia/derechohabiencia.routes"
import accesscardRoutes from "./accesscard/accesscard.routes"
import * as controller from "./home.controller"

const router: Router = Router()

router.use("/alert", alertRoutes)
router.use("/carousel", carouselRoutes)
router.use("/calendar", calendarRoutes)
router.use("/derechohabiencia", derechohabienciaRoutes)
router.use("/accesscard", accesscardRoutes)
router.get("/", controller.getHomeController)
export default router;