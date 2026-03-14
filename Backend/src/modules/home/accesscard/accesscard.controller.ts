import { RequestHandler } from "express";
import * as service from "./accesscard.service"
import { deleteAccessCardParamsSchema, downloadAccessCardFileSchema, getAccesscardSchema, PostAccessCardSchema, postAccessCardShema, putAccessCardParamsSchema, PutAccessCardSchema, putAccessCardShema } from "./accesscard.schema";
import * as fs from "fs"

////////////
// CREATE //
////////////

export const postAccessCardController: RequestHandler = async (req, res) => {
    try {
        const body: PostAccessCardSchema = postAccessCardShema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        await service.postAccessCardService(dto)
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

export const getAccessCardController: RequestHandler = async (req, res) => {
    try {
        const dto = getAccesscardSchema.parse(req.query)
        const data = await service.getAccessCardService(dto)
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

export const downloadAccessCardFileController: RequestHandler = async (req, res) => {
    try {
        const params = downloadAccessCardFileSchema.parse(req.params)
        const data = await service.downloadAccessCardFileService(params.id)

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

export const putAccessCardController: RequestHandler = async (req, res) => {
    try {
        const params = putAccessCardParamsSchema.parse(req.params)
        const body: PutAccessCardSchema = putAccessCardShema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putAccessCardService(params.id, dto)
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

export const deleteAccessCardController: RequestHandler = async (req, res) => {
    try {
        const params = deleteAccessCardParamsSchema.parse(req.params)
        service.deleteAccessCardService(params.id)
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