import { RequestHandler } from "express";
import * as  schema from "./codes.schema"
import * as service from "./codes.service"

//////////
// READ //
//////////

export const getCodesController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getCodesSchema.parse(req.query)
        const data = await service.getCodesService(dto)

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

export const getCategorysController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getCategorysService()
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