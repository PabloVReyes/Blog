import { RequestHandler } from "express"
import * as scheme from "./juristics.scheme"
import * as service from "./juristics.service"

///
// CREATE //
////

export const postJuristicController: RequestHandler = async (req, res) => {
    try {
        const body: scheme.PostJuristicScheme = scheme.postJuristicScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        await service.postJuristicService(dto)
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
                msg: error.message || "Error al disposición juridica"
            })
    }
}

///
// READ //
//////////

export const getJuristicsController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getJuristicsScheme.parse(req.query)
        const data = await service.getJuristicsService(dto)
        res.json(data)
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener disposiciones juridicas"
            })
    }
}

export const downloadJuristicFileController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.downloadJuristicsScheme.parse(req.params)
        const data: any = await service.downloadJuristicFileService(params.id)

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

//// 
// UPDATE 
/////

export const putJuristicController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putJuristicsParamsScheme.parse(req.params)
        const body: scheme.PutJuristicsScheme = scheme.putJuristicsScheme.parse(req.body)
        const file = req.file
        const dto = { ...body, file }
        const data = await service.putJuristicService(params.id, dto)
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
                msg: error.message || "Error al actualizar la disposición juridica"
            })
    }
}

///
// DELETE 
////

export const deleteJuristicController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.deleteJuristicsParamsScheme.parse(req.params)
        await service.deleteJuristicsService(params.id)

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
                msg: error.message || "Error al eliminar disposición juridica"
            })
    }
}