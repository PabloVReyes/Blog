import { RequestHandler } from "express";
import * as service from "./settings.service"
import * as schema from "./settings.schema"

export const settingsController: RequestHandler = async (req, res) => {
    try {
        const data = await service.settingsService()
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Obtener configuración"
            })
    }
}

export const updateSettingsController: RequestHandler = async (req, res) => {
    try {
        const body: schema.UpdateSettingsSchema = schema.updateSettingsSchema.parse(req.body)
        await service.updateSettingsService(body)
        res.json({ success: true })
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Actualizar configuración"
            })
    }
}

export const uploadFaviconController: RequestHandler = async (req, res) => {
    try {
        const file = req.file
        const data = await service.uploadFaviconService(file)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al subir el icono"
            })
    }
}
