import { RequestHandler } from "express"
import * as scheme from "./standars.scheme"
import * as service from "./standars.service"

////
// CREATE //
///

export const postStandarController: RequestHandler = async (req, res) => {
    try {
        const body: scheme.PostStandarScheme = scheme.postStandarScheme.parse(req.body)
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
        const body: scheme.PostCategoryScheme = scheme.postCategoryScheme.parse(req.body)
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
        const dto = scheme.getStandarScheme.parse(req.query)
        const data = await service.getStandarsService(dto)
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
        const params = scheme.downloadStandarScheme.parse(req.params)
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
        const params = scheme.putStandarParamsScheme.parse(req.params)
        const body: scheme.PutStandarScheme = scheme.putStandarScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putStandarService(params.id, dto)
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
        const params = scheme.deleteStandarParamsScheme.parse(req.params)
        await service.deleteStandarService(params.id)

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