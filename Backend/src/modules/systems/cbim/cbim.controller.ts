import { RequestHandler } from "express";
import * as schema from "./cbim.schema";
import * as service from "./cbim.service"

////////////
// CREATE //
////////////

export const postCbimController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostCbimSchema = schema.postCbimSchema.parse(req.body)
        await service.postCbimService(body)
        res.json({ success: true })
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

//////////
// READ //
//////////

export const getCbimController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getCbimSchema.parse(req.query)
        const data = await service.getCbimService(dto)
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

////////////
// UPDATE //
////////////

export const putCbimController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putCbimParamsSchema.parse(req.params)
        const body: schema.PutCbimSchema = schema.putCbimSchema.parse(req.body)
        const data = await service.putCbimService(params.id, body)
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

////////////
// DELETE //
////////////

export const deleteCbimController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteCbimParamsSchema.parse(req.params)
        await service.deleteCbimService(params.id)
        res.json({ success: true })
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