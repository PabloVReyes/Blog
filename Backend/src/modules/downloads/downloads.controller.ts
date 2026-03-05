import { RequestHandler } from "express";
import * as scheme from "./downloads.scheme"
import * as service from "./downloads.service"

////////////
// CREATE //
////////////

export const postDownloadController: RequestHandler = async (req, res) => {
    try {
        const body: scheme.PostDownloadScheme = scheme.postDownloadScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        await service.postDownloadService(dto)
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
                msg: error.message || "Error al crear descarga"
            })
    }
}

export const postDownloadAreaController: RequestHandler = async (req, res) => {
    try {
        const body: scheme.PostAreaSchema = scheme.postAreaSchema.parse(req.body)
        await service.postAreaService(body)
        res.json({ succes: true })
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

export const postSectionController: RequestHandler = async (req, res) => {
    try {
        const body: scheme.PostSectionScheme = scheme.postSectionScheme.parse(req.body)
        const data = await service.postSectionService(body)
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
                msg: error.message || "Error al crear sección"
            })
    }
}

export const postCategoryController: RequestHandler = async (req, res) => {
    try {
        const body: scheme.PostCategoryScheme = scheme.postCategoryScheme.parse(req.body)
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
                msg: error.message || "Error al crear categoria"
            })
    }
}

//////////
// READ //
//////////

export const downloadFileController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.downloadFileParamsScheme.parse(req.params)
        const data = await service.downloadFileService(params.id)

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

export const getDownloadsController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getDownloadsScheme.parse(req.query)
        const data = await service.getDownloadsService(dto)
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

export const getAreasController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getAreaSchema.parse(req.query)
        const data = await service.getAreasService(dto)
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

export const getAreasWithDownloadsController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.getAreaWithDownloadsParamsSchema.parse(req.params)
        const data = await service.getAreaWithDownloadsService(params.slug)
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

export const getSectionsByAreaController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.getSectionsByAreaParamsSchema.parse(req.params)
        const data = await service.getSectionsByAreaService(params.area)
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

export const getCategoriesBySectionController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.getCategoriesBySectionParamsScheme.parse(req.params)
        const data = await service.getCategoriesBySectionService(params.section)
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

////////////
// UPLOAD //
////////////

export const putDownloadController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putDownloadParamsScheme.parse(req.params)
        const body: scheme.PutDownloadScheme = scheme.putDownloadScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putDownloadService(params.id, dto)
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

export const putAreaController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putAreaParamsScheme.parse(req.params)
        const body: scheme.PutAreaSchema = scheme.putAreaSchema.parse(req.body)
        const data = await service.putAreaService(params.id, body)
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

export const deleteDownloadController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putDownloadParamsScheme.parse(req.params)
        await service.deleteDownloadService(params.id)
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

export const deleteAreaController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putAreaParamsScheme.parse(req.params)
        await service.deleteAreaService(params.id)
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