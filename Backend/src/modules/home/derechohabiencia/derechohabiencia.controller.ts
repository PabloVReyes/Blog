import { RequestHandler } from "express";
import * as service from "./derechohabiencia.service"
import { putDerechohabienciaParamsSchema, putDerechohabienciaSchema } from "./derechohabiencia.schema";

//////////
// READ //
//////////

export const getDerechohabienciaController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getDerechohabienciaService()
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(400).json({
            message: "Error en la solicitud"
        })
    }
}

////////////
// UPDATE //
////////////

export const putDerechohabienciaController: RequestHandler = async (req, res) => {
    try {
        const params = putDerechohabienciaParamsSchema.parse(req.params)
        const body = putDerechohabienciaSchema.parse(req.body)
        const data = await service.putDerechohabienciaService(params.id, body)
        res.json(data)
    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.status(422).json({
                success: false,
                message: "Datos inválidos",
                errors: error.flatten(),
            });
        }

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al crear un carrusel"
            })
    }
}