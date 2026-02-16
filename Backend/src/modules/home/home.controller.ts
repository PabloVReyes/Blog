import { RequestHandler } from "express"
import * as service from "./home.service"

// READ
export const getHomeController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getHomeSectionsService()
        res.json(data)

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(400).json({
            message: "Error en la solicitud"
        })

    }
}