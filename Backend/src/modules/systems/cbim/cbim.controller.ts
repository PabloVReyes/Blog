import { RequestHandler } from "express";
import { deleteCbimParamsSchema, getCbimSchema, PostCbimSchema, postCbimShema, putCbimParamsSchema, PutCbimSchema, putCbimShema } from "./cbim.scheme";
import * as service from "./cbim.service"

////////////
// CREATE //
////////////

export const postCbimController: RequestHandler = async (req, res) => {
    try {
        const body: PostCbimSchema = postCbimShema.parse(req.body)
        await service.postCbimService(body)
        res.json({ success: true })
    } catch (error) {
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
        const dto = getCbimSchema.parse(req.query)
        const data = await service.getCbimService(dto)
        res.json(data)
    } catch (error) {
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
        const params = putCbimParamsSchema.parse(req.params)
        const body: PutCbimSchema = putCbimShema.parse(req.body)
        const data = await service.putCbimService(params.id, body)
        res.json(data)
    } catch (error) {
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
        const params = deleteCbimParamsSchema.parse(req.params)
        await service.deleteCbimService(params.id)
        res.json({ success: true })
    } catch (error) {
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