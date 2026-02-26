import { RequestHandler } from "express";
import * as service from "./careProtocols.service"
import { deleteCareProtocolsParamsScheme, downloadCareProtocolFileSchema, getCareProtocolsScheme, GetCareProtocolsScheme, postCareProtocolsSchema, PostCareProtocolsScheme, postCategoryScheme, PostCategoryScheme, putCareProtocolsParamsScheme, putCareProtocolsScheme, PutCareProtocolsScheme } from "./careProtocols.scheme";
import fs from "fs"

////////////
// CREATE //
////////////

export const postCareProtocolsController: RequestHandler = async (req, res) => {
    try {
        const body: PostCareProtocolsScheme = postCareProtocolsSchema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }

        await service.postCareProtocolsService(dto)

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

export const postCategoryController: RequestHandler = async (req, res) => {
    try {
        const body: PostCategoryScheme = postCategoryScheme.parse(req.body)
        const data = await service.postCategoryService(body)
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

export const getCategoryController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getCategoryService()
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

export const getCareProtocolsController: RequestHandler = async (req, res) => {
    try {
        const dto = getCareProtocolsScheme.parse(req.query)
        const data = await service.getCareProtocolsService(dto)

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

export const getCategoryWithCareProtocolsController: RequestHandler = async (req, res) => {
    try {
        const dto = getCareProtocolsScheme.parse(req.query)
        const data = await service.getCategoryWithCareProtocolsService(dto)
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
        const params = downloadCareProtocolFileSchema.parse(req.params)
        const data = await service.dowloadCareProtocolFileService(params.id)

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

export const putCareProtocolsController: RequestHandler = async (req, res) => {
    try {
        const params = putCareProtocolsParamsScheme.parse(req.params)
        const body: PutCareProtocolsScheme = putCareProtocolsScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putCareProtocolsService(params.id, dto)
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

export const deleteCareProtocolController: RequestHandler = async (req, res) => {
    try {
        const params = deleteCareProtocolsParamsScheme.parse(req.params)
        await service.deleteCareProtocolsService(params.id)

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