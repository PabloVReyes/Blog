import { RequestHandler } from "express";
import * as service from "./calendar.service"
import * as schema from "./calendar.schema"
import * as fs from "fs"

//////////
// READ //
//////////

export const getCalendarController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getCalendarService()
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

export const downloadCalendarFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadCalendarFileParamsSchema.parse(req.params)
        const data = await service.downloadCalendarFileService(params.id)

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${data.fileName}"`
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

export const putCalendarController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putCalendarParamsSchema.parse(req.params)
        const body: schema.PutCalendarSchema = schema.putCalendarShema.parse(req.body)

        const file = req.file

        const dto = { ...body, file }

        const data = await service.putCalendarService(params.id, dto)

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