import { getSectionsService, putSectionService } from "@/services/sections.service";
import { RequestHandler } from "express";

export const getSectionsController: RequestHandler = async (req, res) => {
    try {
        const data = await getSectionsService()
        res.json(data)
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Obtener secciones de inicio"
            })
    }
}

export const putSectionController: RequestHandler = async (req, res) => {
    try {
        await putSectionService(req)
        res.json("Ok")
    } catch (error) {
        res.status(500)
            .send({
                msg: error.message || "Actualizar seccion"
            })
    }
}