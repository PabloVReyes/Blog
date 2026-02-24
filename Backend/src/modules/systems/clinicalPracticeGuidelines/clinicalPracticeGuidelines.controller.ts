import { RequestHandler } from "express";
import { deleteClinicalPracticeGuidelinesParamsScheme, downloadClinicalPracticeGuidelinesFileSchema, getClinicalPracticeGuidelinesScheme, postCategorySchema, PostCategorySchema, postClinicalPracticeGuidelinesScheme, PostClinicalPracticeGuidelinesScheme, putClinicalPracticeGuidelinesParamsScheme, putClinicalPracticeGuidelinesScheme, PutClinicalPracticeGuidelinesScheme } from "./clinicalPracticeGuidelines.scheme";
import * as service from "./clinicalPracticeGuidelines.service"
import fs from "fs"

////////////
// CREATE //
////////////

export const postClinicalPracticeGuidelinesController: RequestHandler = async (req, res) => {
    try {
        const body: PostClinicalPracticeGuidelinesScheme = postClinicalPracticeGuidelinesScheme.parse(req.body)

        const files = req.files as {
            er?: Express.Multer.File[];
            rr?: Express.Multer.File[]
        }

        const er = files?.er?.[0];
        const rr = files?.rr?.[0];

        const dto = { ...body, er, rr }

        await service.postClinicalPracticeGuidelinesService(dto)

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
                msg: error.message || "Error al crear guia"
            })
    }
}

export const postCategoryController: RequestHandler = async (req, res) => {
    try {
        const body: PostCategorySchema = postCategorySchema.parse(req.body)
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}

//////////
// READ //
//////////

export const downloadClinicalPracticeGuidelinesFileController: RequestHandler = async (req, res) => {
    try {
        const params = downloadClinicalPracticeGuidelinesFileSchema.parse(req.params)
        const data = await service.downloadClinicalPracticeGuidelinesFileService(params.id, params.type)
        
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

export const getClinicalPracticeGuidelinesController: RequestHandler = async (req, res) => {
    try {
        const dto = getClinicalPracticeGuidelinesScheme.parse(req.query)
        const data = await service.getClinicalPracticeGuidelinesService(dto)
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener categorias"
            })
    }
}

export const getCategoryController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getCategoryService()
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener categorias"
            })
    }
}

////////////
// UPDATE //
////////////

export const putClinicalPracticeGuidelinesController: RequestHandler = async (req, res) => {
    try {
        const params = putClinicalPracticeGuidelinesParamsScheme.parse(req.params)
        const body: PutClinicalPracticeGuidelinesScheme = putClinicalPracticeGuidelinesScheme.parse(req.body)

        const files = req.files as {
            er?: Express.Multer.File[];
            rr?: Express.Multer.File[]
        }

        const er = files?.er?.[0];
        const rr = files?.rr?.[0];

        const dto = { ...body, er, rr }

        const data = await service.putClinicalPracticeGuidelinesService(params.id, dto)

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

export const deleteClinicalPracticeGuidelinesController: RequestHandler = async (req, res) => {
    try {
        const params = deleteClinicalPracticeGuidelinesParamsScheme.parse(req.params)
        await service.daleteClinicalPracticeGuidelinesService(params.id)

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