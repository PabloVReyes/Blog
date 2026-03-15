import { RequestHandler } from "express"
import * as schema from "./certification.schema"
import * as service from "./certification.service"

///
// CREATE
//

export const postCertificationController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostCertificationSchema = schema.postCertificationSchema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        await service.postCertificationService(dto)
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
                msg: error.message || "Error al crear cretificación"
            })
    }
}

export const postSectionController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostSectionSchema = schema.postSectionSchema.parse(req.body)
        const data = await service.postSectionService(body)
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
                msg: error.message || "Error al crear sección"
            })
    }
}

/////
// READ
//

export const getSectionWithCertificationsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getSectionWithCertificationsSchema.parse(req.query)
        const data = await service.getSectionsWithCertificationsService(dto)
        res.json(data)
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener secciones"
            })
    }
}

export const getSectionsController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getSectionsService()
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

export const getCertificationsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getCertificationsSchema.parse(req.query)
        const data = await service.getCertificationsService(dto)
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

export const downloadCertificationFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadCertificationSchema.parse(req.params)
        const data: any = await service.downloadCertificationFileService(params.id)

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
                msg: error.message || "Error al descargar certificado"
            })
    }
}

///
//
//

export const putCertificationController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putCertificationParamsSchema.parse(req.params)
        const body: schema.PutCertificationSchema = schema.putCertificationSchema.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putCertificationService(params.id, dto)
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

//
// DELETE
//

export const deleteCertificationController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteCertificationParamsSchema.parse(req.params)
        await service.deleteCertificationService(params.id)

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
                msg: error.message || "Error al eliminar certificación"
            })
    }
}