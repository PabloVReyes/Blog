import * as service from "./macroprocess.service"
import { RequestHandler } from "express";
import * as schema from "./macroprocess.schema"

//////////
// READ //
//////////

export const downloadManualFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadManualFileParamsSchema.parse(req.params)
        const data: any = await service.downloadManualFileService(params.id)

        const mimeType = data.mimeType || "application/octet-stream"

        res.setHeader("Content-Type", mimeType)
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition")

        // 👇 Si es PDF → visualizar inline
        if (mimeType === "application/pdf") {
            res.setHeader(
                "Content-Disposition",
                `inline; filename="${data.fileName}"`
            )

            return res.sendFile(data.filePath)
        }

        // 👇 Cualquier otro archivo → forzar descarga
        return res.download(data.filePath, data.fileName)

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

export const getManualByTypeController: RequestHandler = async (req, res) => {
    try {
        const params = schema.getManualsByTypeParamsSchema.parse(req.params)
        const data = await service.getManualByTypeService(params.type)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener manual por tipo"
            })
    }
}

export const getAreaWithManualsController: RequestHandler = async (req, res) => {
    try {
        const params = schema.getAreaWithManualsParamsSchema.parse(req.query)
        const data = await service.getAreaWithManualsService(params.id)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al crear obtener area"
            })
    }
}

export const getAreasController: RequestHandler = async (req, res) => {
    try {
        const query = schema.getAreasSchema.parse(req.query)
        const data = await service.getAreasService(query)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener areas"
            })
    }
}

export const getManualsTypeController: RequestHandler = async (req, res) => {
    try {
        const query = schema.getManualsTypeSchema.parse(req.query)
        const data = await service.getManualsTypeService(query)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener tipos de manuales"
            })
    }
}

export const getManualsWithAreaController: RequestHandler = async (req, res) => {
    try {
        const query = schema.getManualsTypeSchema.parse(req.query)
        const data = await service.getManualsWithAreaService(query)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener areas"
            })
    }
}

////////////
// UPDATE //
////////////

export const putManualTypeController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putManualTypeParamsSchema.parse(req.params)
        const body: schema.PutManualTypeSchema = schema.putManualTypeSchema.parse(req.body)
        const data = await service.putManualTypeService(params.id, body)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar tipo de manual"
            })
    }
}

export const putManualController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putManualParamsSchema.parse(req.params)
        const file = req.file
        const data = await service.putManualService(params.id, file)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar manual"
            })
    }
}

export const putAreaController: RequestHandler = async (req, res) => {
    try {
        const data = await service.putAreaService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar area"
            })
    }
}

////////////
// DELETE //
////////////

export const deleteManualController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteManualParamsSchema.parse(req.params)
        const data = await service.deleteManualService(params.id)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error eliminar el manual"
            })
    }
}