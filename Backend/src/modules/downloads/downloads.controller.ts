import { RequestHandler } from "express";
import * as scheme from "./downloads.scheme"
import * as service from "./downloads.service"

////////////
// CREATE //
////////////

export const postDownloadAreaController: RequestHandler = async (req, res) => {
    try {
        const body: scheme.PostAreaSchema = scheme.postAreaSchema.parse(req.body)
        await service.postAreaService(body)
        res.json({ succes: true })
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

export const getAreasController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getAreaSchema.parse(req.query)
        const data = await service.getAreasService(dto)
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

export const getAreasWithDownloadsController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.getAreaWithDownloadsParamsSchema.parse(req.params)
        const data = await service.getAreaWithDownloads(params.slug)
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
// UPLOAD //
////////////

export const putAreaController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putAreaParamsScheme.parse(req.params)
        const body: scheme.PutAreaSchema = scheme.putAreaSchema.parse(req.body)
        const data = await service.putAreaService(params.id, body)
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

export const deleteAreaController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putAreaParamsScheme.parse(req.params)
        await service.deleteAreaService(params.id)
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