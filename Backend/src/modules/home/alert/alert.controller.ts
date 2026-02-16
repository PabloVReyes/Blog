import { RequestHandler } from "express";
import * as service from "./alert.service"
import { putAlertSchema } from "./alert.schema";

export const getAlertController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getAlertService()
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

export const putAlertService: RequestHandler = async (req, res) => {
    try {
        const dto = putAlertSchema.parse({
            id: req.params.id,
            ...req.body
        })

        const data = await service.putAlertService(dto)
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