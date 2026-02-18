import { RequestHandler } from "express";
import { deleteSystemParamsSchema, downloadSystemFileSchema, getSystemSchema, postSystemSchema, PostSystemSchema, putSystemParamsSchema, putSystemSchema, PutSystemSchema } from "./system.schema";
import * as service from "./system.service";
import fs from "fs"

////////////
// CREATE //
////////////

export const postSystemController: RequestHandler = async (req, res) => {
    try {
        const body: PostSystemSchema = postSystemSchema.parse(req.body)
        const file = req.file

        const dto = { ...body, file }

        await service.postSystemService(dto)

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

export const getSystemsController: RequestHandler = async (req, res) => {
    try {
        const dto = getSystemSchema.parse(req.query)
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
        const params = downloadSystemFileSchema.parse(req.params)
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

export const puySystemController: RequestHandler = async (req, res) => {
    try {
        const params = putSystemParamsSchema.parse(req.params)
        const body: PutSystemSchema = putSystemSchema.parse(req.body)
        const file = req.file

        const dto = { ...body, file }
        const data = await service.putSystemService(params.id, dto)

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

export const deleteSystemController: RequestHandler = async (req, res) => {
    try {
        const params = deleteSystemParamsSchema.parse(req.params)
        await service.deteleSystemService(params.id)

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