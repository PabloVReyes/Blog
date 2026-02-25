import { RequestHandler } from "express";
import { deleteGpcParamsScheme, downloadGpcFileSchema, getGpcScheme, postCicleScheme, PostCicleScheme, postGpcScheme, PostGpcScheme, putGpcParamsScheme, putGpcScheme, PutGpcScheme } from "./gpc.scheme";
import * as service from "./gpc.service"
import fs from "fs"

////////////
// CREATE //
////////////

export const postGpcController: RequestHandler = async (req, res) => {
    try {
        const body: PostGpcScheme = postGpcScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }

        await service.postGpcService(dto)

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
                msg: error.message || "Error al crear guia"
            })
    }
}

export const postCicleController: RequestHandler = async (req, res) => {
    try {
        const body: PostCicleScheme = postCicleScheme.parse(req.body)
        const data = await service.postCicleService(body)
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
                msg: error.message || "Error al crear guia"
            })
    }
}

//////////
// READ //
//////////

export const getCicleController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getCicleService()
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener categorias"
            })
    }
}

export const getGpcController: RequestHandler = async (req, res) => {
    try {
        const dto = getGpcScheme.parse(req.query)
        const data = await service.getGpcService(dto)
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener categorias"
            })
    }
}

export const getCicleWithGpcController: RequestHandler = async (req, res) => {
    try {
        const dto = getGpcScheme.parse(req.query)
        const data = await service.getCicleWithGpcService(dto)
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener categorias"
            })
    }
}

export const downloadGpcFileController: RequestHandler = async (req, res) => {
    try {
        const params = downloadGpcFileSchema.parse(req.params)
        const data = await service.dowloadGpcFileService(params.id)

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

export const putGpcController: RequestHandler = async (req, res) => {
    try {
        const params = putGpcParamsScheme.parse(req.params)
        const body: PutGpcScheme = putGpcScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putGpcService(params.id, dto)
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

export const deleteGpcController: RequestHandler = async (req, res) => {
    try {
        const params = deleteGpcParamsScheme.parse(req.params)
        await service.deleteGpcService(params.id)

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