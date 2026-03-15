import * as service from "./vacations.service"
import * as schema from "./vacations.schema"
import { RequestHandler } from "express"

//
// CRATE
//

export const postShiftController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostShiftSchema = schema.postShiftSchema.parse(req.body)
        const dto = { ...body }
        await service.postShiftService(dto)
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
                msg: error.message || "Error al crear turno"
            })
    }
}

export const postVacationController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostVacationSchema = schema.postVacationSchema.parse(req.body)
        const file = req.file;
        const dto = { ...body, file }
        await service.postVacationService(dto)
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

///
// READ //
//////////

export const getVacationsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getVacationsSchema.parse(req.query)
        const data = await service.getVacationsService(dto)
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

export const getShilftsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getShiftsSchema.parse(req.query)
        const data = await service.getShiftsService(dto)
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

export const getShiftWithVacationsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getShiftsWithFilesSchema.parse(req.query)
        const data = await service.getShiftWithVacationsService(dto)
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

export const downloadVacationFileController: RequestHandler = async (req, res) => {
    try {
        const params = schema.downloadVacationSchema.parse(req.params)
        const data: any = await service.downloadVacationsFileService(params.id)

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
// UPDATE 
///

export const putVacationController: RequestHandler = async (req, res) => {
    try {
        const params = schema.PutVacationParamsSchema.parse(req.params)
        const body: schema.PutVacationSchema = schema.putVacationSchema.parse(req.body)
        const file = req.file;
        const dto = { ...body, file }
        const data = await service.putVacationService(params.id, dto)
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
                msg: error.message || "Error al crear descarga"
            })
    }
}

export const putShiftController: RequestHandler = async (req, res) => {
    try {
        const params = schema.PutShiftParamsSchema.parse(req.params)
        const body: schema.PutShiftSchema = schema.putShiftSchema.parse(req.body)
        const dto = { ...body }
        const data = await service.putShiftService(params.id, dto)
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
                msg: error.message || "Error al crear turno"
            })
    }
}

///
// DELETE
////

export const deleteShiftController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteShiftParamsSchema.parse(req.params)
        await service.deleteShiftService(params.id)
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
                msg: error.message || "Error al crear turno"
            })
    }
}

export const deleteVacationController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteVacationParamsSchema.parse(req.params)
        await service.deleteVacationService(params.id)
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
                msg: error.message || "Error al eliminar vacaciones"
            })
    }
}