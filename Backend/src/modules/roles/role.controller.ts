import { RequestHandler } from "express";
import * as schema from "./role.schema"
import * as service from "./role.service"

////////////
// CREATE //
////////////

export const postRoleController: RequestHandler = async (req, res) => {
    try {
        const body: schema.PostRoleSchema = schema.postRoleSchema.parse(req.body)
        await service.postRoleService(body)
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
                msg: error.message || "Error al crear rol"
            })
    }
}

//////////
// READ //
//////////

export const getRolesController: RequestHandler = async (req, res) => {
    try {
        const dto = schema.getRolesSchema.parse(req.query)
        const data = await service.getRolesService(dto)
        res.json(data)
    } catch (error: any) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener roles"
            })
    }
}

////////////
// UPDATE //
////////////

export const putRoleController: RequestHandler = async (req, res) => {
    try {
        const params = schema.putRolesSchemaParams.parse(req.params)
        const body: schema.PutRoleSchema = schema.putRoleSchema.parse(req.body)
        const data = await service.putRoleService(params.id, body)
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
                msg: error.message || "Error al crear rol"
            })
    }
}

////////////
// DELETE //
////////////

export const deleteRoleController: RequestHandler = async (req, res) => {
    try {
        const params = schema.deleteRoleParamsSchema.parse(req.params)
        await service.deleteRoleService(params.id)
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