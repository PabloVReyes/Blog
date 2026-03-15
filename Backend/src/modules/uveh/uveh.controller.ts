import { RequestHandler } from "express";
import * as schema from "./uveh.schema"
import * as service from "./uveh.service"

////////////
// CREATE //
////////////

export const postDownloadController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostDownloadSchema = schema.postDownloadSchema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        await service.postDownloadService(dto)
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
                msg: error.message || "Error al crear descarga"
            })
    }
}

export const postCategoryController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostCategorySchema = schema.postCategorySchema.parse(req.body)
        const data = await service.postCategoryService(body)
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
                msg: error.message || "Error al crear categoria"
            })
    }
}

//////////
// READ //
//////////

export const getCategoriesController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getCategoriesService()
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

export const getCategoriesWithDownloadsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getCategoryWithDownloadsSchema.parse(req.query)
        const data = await service.getCategoriesWithDownloadsService(dto)
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

export const getDownloadsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getDownloadsSchema.parse(req.query)
        const data = await service.getDownloadsService(dto)
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

export const downloadFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadFileSchema.parse(req.params)
        const data: any = await service.downloadFileService(params.id)

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

////////////
// UPDATE //
////////////

export const putDownloadController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putDownloadParamsSchema.parse(req.params)
        const body: schema.PutDownloadSchema = schema.putDownloadSchema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putDownloadService(params.id, dto)
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
                msg: error.message || "Error al actualizar la descarga"
            })
    }
}

////////////
// DELETE //
////////////

export const deleteDownloadController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteDownloadParamsSchema.parse(req.params)
        await service.deleteDownloadService(params.id)

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