import { Router } from "express";
import settingsRoutes from "@/routes/settings.routes"
import pagesRoutes from "@/routes/pages.routes"

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

module.exports = router;