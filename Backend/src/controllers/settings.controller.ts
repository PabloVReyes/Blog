import { settingsService, updateSettingsService, uploadFaviconService } from "@/services/settings.service";
import { RequestHandler, response } from "express";

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

export const updateSettingsController: RequestHandler = async (request, response) => {
    try {
        const body = request.body
        await updateSettingsService(body)
        response.json('Ok')
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Actualizar configuración"
            })
    }
}
export const uploadFaviconController = async (request, response) => {
    try {
        if (!request.file) {
            response.status(500).send({ msg: "No se ha enviado ningun archivo" })
        }

        const url = await uploadFaviconService(request.file)

        response.json({ url: url })
    } catch (error: any) {
        response.status(500)
            .send({
                msg: error.message || "Error al subir el icono"
            })
    }
}