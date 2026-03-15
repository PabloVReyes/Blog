import { RequestHandler } from "express";
import * as service from "./adverseEvents.service"
import * as schema from "./adverseEvents.schema";
import * as fs from "fs"

//////////
// READ //
//////////

export const getAdverseEventsController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getAdverseEventsService()
        res.json(data)
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener categorias"
            })
    }
}

export const downloadAdverseEventsFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadAdverseEventFileSchema.parse(req.params)
        const data = await service.downloadAdverseEventsFileService(params.type)

        res.setHeader("Content-Type", "application/pdf"); // 👈 importante
        res.setHeader(
            "Content-Disposition",
            `inline; filename="${data.fileName}"`
        );

        res.setHeader(
            "Access-Control-Expose-Headers",
            "Content-Disposition"
        );

        fs.createReadStream(data.filePath).pipe(res);
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

export const putAdverseEventsController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putAdverseEventsParamsSchema.parse(req.params)
        const file = req.file
        const data = await service.putAdverseEventService(params.id, file)
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

export const deleteAdverseEventController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putAdverseEventsParamsSchema.parse(req.params)
        const data = await service.deleteAdverseEventService(params.id)
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