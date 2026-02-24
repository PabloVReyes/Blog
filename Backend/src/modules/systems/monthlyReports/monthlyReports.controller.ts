import * as service from "./monthlyReports.service"
import { RequestHandler } from "express";
import { deleteMonthlyReportsParamsSchema, downloadMonthlyReportsFileSchema, getMonthlyReportsSchema, postMonthlyReportsSchema, PostMonthlyReportsSchema, putMonthlyReportsParamsSchema, putMonthlyReportsSchema, PutMonthlyReportsSchema } from "./monthlyReports.schema";
import fs from "fs"

////////////
// CREATE //
////////////

export const postMonthlyReportsController: RequestHandler = async (req, res) => {
    try {
        const body: PostMonthlyReportsSchema = postMonthlyReportsSchema.parse(req.body)
        const file = req.file

        const dto = { ...body, file }

        await service.postMonthlyReportsService(dto)
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

//////////
// READ //
//////////

export const getMonthlyReportsController: RequestHandler = async (req, res) => {
    try {
        const dto = getMonthlyReportsSchema.parse(req.query)
        const data = await service.getMonthlyReportsService(dto)

        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(400).json({
            message: "Error en la solicitud"
        })
    }
}

export const getPeriodsController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getPeriodsService()
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(400).json({
            message: "Error en la solicitud"
        })
    }
}

export const downloadMonthlyReportsController: RequestHandler = async (req, res) => {
    try {
        const params = downloadMonthlyReportsFileSchema.parse(req.params)
        const data = await service.downloadMonthlyReportFileService(params.id)

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

export const putMonthlyReportsController: RequestHandler = async (req, res) => {
    try {
        const params = putMonthlyReportsParamsSchema.parse(req.params)
        const body: PutMonthlyReportsSchema = putMonthlyReportsSchema.parse(req.body)
        const file = req.file

        const dto = { ...body, file }
        const data = await service.putMonthlyReportsService(params.id, dto)

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

export const deteleMonthlyReportsController: RequestHandler = async (req, res) => {
    try {
        const params = deleteMonthlyReportsParamsSchema.parse(req.params)
        await service.deleteMonthlyReportsService(params.id)

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