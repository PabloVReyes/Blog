import { settingsService } from "@/services/settings.service";
import { RequestHandler } from "express";

export const settingsController: RequestHandler = async (request, response) => {
    try {
        const data = await settingsService()
        response.json(data)
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Obtener configuración"
            })
    }
}