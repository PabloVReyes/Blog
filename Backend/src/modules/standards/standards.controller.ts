import { RequestHandler } from "express"
import * as schema from "./standards.schema"
import * as service from "./standards.service"

////////////
// CREATE //
////////////

export const postStandarController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostStandardSchema = schema.postStandardSchema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        await service.postSdantardService(dto)
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
                msg: error.message || "Error al crear norma oficial"
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

export const getSdandarsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getStandardSchema.parse(req.query)
        const data = await service.getStandardsService(dto)
        res.json(data)
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener normas oficiales"
            })
    }
}

export const downloadStandarFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadStandardSchema.parse(req.params)
        const data: any = await service.downloadStandarFileService(params.id)

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

///
// UPDATE //
////////////

export const putStandarController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putStandarParamsSchema.parse(req.params)
        const body: schema.PutStandardSchema = schema.putStandardSchema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putStandardService(params.id, dto)
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
                msg: error.message || "Error al actualizar la norma"
            })
    }
}

////////////
// DELETE //
////////////

export const deleteStandarController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteStandarParamsSchema.parse(req.params)
        await service.deleteStandardService(params.id)

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
                msg: error.message || "Error al eliminar norma"
            })
    }
}