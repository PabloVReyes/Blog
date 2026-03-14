import { RequestHandler } from "express";
import { deletePBMParamsScheme, downloadPBMFileSchema, getPBMScheme, postPbmScheme, PostPbmScheme, putPBMParamsScheme, putPBMScheme, PutPBMScheme } from "./pbm.scheme";
import * as service from "./pbm.service"
import * as fs from "fs"

////////////
// CREATE //
////////////

export const postPbmController: RequestHandler = async (req, res) => {
    try {
        const body: PostPbmScheme = postPbmScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        await service.postPbmService(dto)

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
                msg: error.message || "Error al crear guia"
            })
    }
}

//////////
// READ //
//////////

export const downloadPBMFileController: RequestHandler = async (req, res) => {
    try {
        const params = downloadPBMFileSchema.parse(req.params)
        const data = await service.downloadPBMFileService(params.id)

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

export const getPBMController: RequestHandler = async (req, res) => {
    try {
        const dto = getPBMScheme.parse(req.query)
        const data = await service.getPBMService(dto)
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

////////////
// UPDATE //
////////////

export const putPBMController: RequestHandler = async (req, res) => {
    try {
        const params = putPBMParamsScheme.parse(req.params)
        const body: PutPBMScheme = putPBMScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putPBMService(params.id, dto)
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

export const deletePBMController: RequestHandler = async (req, res) => {
    try {
        const params = deletePBMParamsScheme.parse(req.params)
        await service.daletePBMService(params.id)

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