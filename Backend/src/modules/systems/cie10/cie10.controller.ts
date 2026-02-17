import { RequestHandler } from "express";
import { deleteCie10ParamsSchema, getCie10Schema, PostCie10Schema, postCie10Shema, putCie10ParamsSchema, PutCie10Schema, putCie10Shema } from "./cie10.schema";
import * as service from "./cie10.service"

////////////
// CREATE //
////////////

export const postCie10Controller: RequestHandler = async (req, res) => {
    try {
        const body: PostCie10Schema = postCie10Shema.parse(req.body)
        await service.postCie10Service(body)
        res.json({ sucess: true })
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

export const getCie10Controller: RequestHandler = async (req, res) => {
    try {
        const dto = getCie10Schema.parse(req.query)
        const data = await service.getCie10Service(dto)

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

////////////
// UPDATE //
////////////

export const putCie10Controller: RequestHandler = async (req, res) => {
    try {
        const params = putCie10ParamsSchema.parse(req.params)
        const body: PutCie10Schema = putCie10Shema.parse(req.body)
        const data = await service.putCie10Service(params.id, body)
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


export const deleteCie10Controller: RequestHandler = async (req, res) => {
    try {
        const params = deleteCie10ParamsSchema.parse(req.params)
        await service.deleteCie10Service(params.id)
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