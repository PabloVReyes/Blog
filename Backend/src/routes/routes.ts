import { Router } from "express";
import settingsRoutes from "@/routes/settings.routes"
import pagesRoutes from "@/routes/pages.routes"
import carouselRoutes from "@/routes/carousel.routes"
import filesRoutes from "@/routes/files.routes"

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
router.use("/api/carousel", carouselRoutes)
router.use("/api/files", filesRoutes)

module.exports = router;