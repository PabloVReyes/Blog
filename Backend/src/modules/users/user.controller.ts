import { Request, RequestHandler, Response } from "express"
import * as service from "./user.service"
import * as scheme from "./user.scheme"

////////////
// CREATE //
////////////

export const createUserController = async (req: Request, res: Response) => {
    try {
        const body: scheme.CreateUserScheme = scheme.createUserScheme.parse(req.body)
        await service.createUserService(body)
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
                msg: error.message || "Error al crear usuario"
            })
    }
}

//////////
// READ //
//////////

export const getUsersController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getUsersScheme.parse(req.query)
        const data = await service.getUsersService(dto)
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

////////////
// UPDATE //
////////////

export const putMeController: RequestHandler = async (req: any, res) => {
    try {
        const params = scheme.putMeParamsScheme.parse(req.params)

        if (req.user.id !== params.id) {
            return res.status(403).json({ message: 'Acceso denegado' })
        }

        const body: scheme.PutMeScheme = scheme.putMeScheme.parse(req.body)
        const data = await service.putMeService(params.id, body)
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

export const putUserController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.putUserParamsScheme.parse(req.params)
        const body: scheme.PutUserScheme = scheme.putUserScheme.parse(req.body)
        const data = await service.putUserService(params.id, body)
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

export const resetPasswordController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.resetPasswordParamsScheme.parse(req.params)
        const data = await service.resetPasswordService(params.id)
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

export const changePasswordController: RequestHandler = async (req: any, res) => {
    try {
        const params = scheme.changePasswordParamsScheme.parse(req.params)

        if (req.user.id !== params.id) {
            return res.status(403).json({ message: 'Acceso denegado' })
        }

        const body: scheme.ChangePasswordScheme = scheme.changePasswordScheme.parse(req.body)
        await service.changePasswordService(params.id, body)
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

////////////
// DELETE //
////////////

export const deleteUserController: RequestHandler = async (req, res) => {
    try {
        const params = scheme.deleteUserParamsScheme.parse(req.params)
        await service.deleteUserService(params.id)
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

