import * as schema from "./agreementPersons.schema";
import { RequestHandler } from "express";
import * as service from "./agreementPerson.service"

////////////
// CREATE //
////////////

export const postAgreementPersonController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostAgreementPersonsSchema = schema.postAgreementPersonsShema.parse(req.body)
        await service.postAgreementPersonService(body)
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

export const postZoneController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostZoneSchema = schema.postZoneSchema.parse(req.body)
        const data = await service.postZoneService(body)
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}

export const postGroupController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostGroupSchema = schema.postGroupSchema.parse(req.body)
        const data = await service.postGroupService(body)
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}


//////////
// READ //
//////////

export const getAgreementPersonWithDependentsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getAgreementPersonsSchema.parse(req.query)
        const data = await service.getAgreementPersonWithDependentsService(dto)
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

export const getAgreementPersonController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getAgreementPersonsSchema.parse(req.query)
        const data = await service.getAgreementPersonService(dto)
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


export const getGroupsController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getGroupService()
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

export const getZonesController: RequestHandler = async (req, res) => {
    try {
        const data = await service.getZonesService()
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
// UPDATE //
////////////

export const putAgreementPersonController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putAgreementPersonsParamsSchema.parse(req.params)
        const body: schema.PutAgreementPersonsSchema = schema.putAgreementPersonsShema.parse(req.body)
        const data = await service.putAgreementPersonService(params.id, body)
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
                msg: error.message || "Error al crear un carrusel"
            })
    }
}

////////////
// DELETE //
////////////

export const deleteAgreementPersonController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteAgreementPersonsParamsSchema.parse(req.params)
        await service.deleteAgreementPersonService(params.id)
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