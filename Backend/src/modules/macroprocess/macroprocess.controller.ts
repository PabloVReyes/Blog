import * as service from "./macroprocess.service"
import { RequestHandler } from "express";

export const getAreaWithManualsController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getAreaWithManualsService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al crear obtener area"
            })
    }
}

export const getManualByTypeController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getManualByTypeService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener manual por tipo"
            })
    }
}


export const putManualController: RequestHandler = async (req, res) => {
    try {
        const data = await service.putManualService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar manual"
            })
    }
}

export const downloadManualFileController: RequestHandler = async (req, res) => {
    try {
        const data: any = await service.downloadManualFileService(req)

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

export const deleteManualController: RequestHandler = async (req, res) => {
    try {
        const data = await service.deleteManualService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error eliminar el manual"
            })
    }
}

export const putManualTypeController: RequestHandler = async (req, res) => {
    try {
        const data = await service.putManualTypeService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al actualizar tipo de manual"
            })
    }
}

//////////
// READ //
//////////

export const getAreasController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getAreasService(req)
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
        const data = await service.getManualsTypeService(req)
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
        const data = await service.getManualsWithAreaService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener areas"
            })
    }
}

export const getManualsWithAreaCountController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getManualsWithAreaCountService(req)
        res.json(data)
    } catch (error: any) {
        res.status(500)
            .send({
                msg: error.message || "Error al obtener manuales"
            })
    }
}


////////////
// UPDATE //
////////////

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