import { Request, RequestHandler, Response } from "express"
import * as service from "./user.service"
import * as scheme from "./user.scheme"

export const createUserController = async (req: Request, res: Response) => {
    try {
        const user = await service.createUserService(req.body)
        res.json(user)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getSdandarsController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getUsersScheme.parse(req.query)
        const data = await service.getUsersService(dto)
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener normas oficiales"
            })
    }
}
