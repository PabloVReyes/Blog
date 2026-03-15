import { RequestHandler } from "express";
import * as schema from "./permission.schema"
import * as service from "./permission.service"

export const postPermissionController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostPermissionsSchema = schema.postPermissionsSchema.parse(req.body)
        await service.postPermissionsService(body)
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
                msg: error.message || "Error al crear permiso"
            })
    }
}

export const getPermissionsController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getPermissionsSchema.parse(req.query)
        const data = await service.getPermissionsService(dto)
        res.json(data)
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener permisos"
            })
    }
}

export const putPermissionController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putPermissionParamsSchema.parse(req.params)
        const body: schema.PostPermissionsSchema = schema.postPermissionsSchema.parse(req.body)
        const data = await service.putPermissionsService(params.id, body)
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
                msg: error.message || "Error al crear permiso"
            })
    }
}

export const deletePermissionController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deletePermissionParamsSchema.parse(req.params)
        await service.deletePermissionService(params.id)
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