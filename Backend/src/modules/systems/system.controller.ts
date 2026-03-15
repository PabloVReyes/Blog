import { RequestHandler } from "express";
import * as schema from "./system.schema"
import * as service from "./system.service";
import * as fs from "fs"

////////////
// CREATE //
////////////

export const postSystemController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostSystemSchema = schema.postSystemSchema.parse(req.body)
        const file = req.file

        const dto = { ...body, file }

        await service.postSystemService(dto)

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

export const getSystemsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getSystemSchema.parse(req.query)
        const data = await service.getSystemService(dto)
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

export const downloadSystemFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadSystemFileSchema.parse(req.params)
        const data = await service.downloadSystemFileService(params.id)

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

export const puySystemController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putSystemParamsSchema.parse(req.params)
        const body: schema.PutSystemSchema = schema.putSystemSchema.parse(req.body)
        const file = req.file

        const dto = { ...body, file }
        const data = await service.putSystemService(params.id, dto)

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

export const deleteSystemController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteSystemParamsSchema.parse(req.params)
        await service.deteleSystemService(params.id)

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