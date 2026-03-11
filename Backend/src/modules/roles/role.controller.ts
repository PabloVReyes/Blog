import { RequestHandler } from "express";
import * as scheme from "./role.scheme"
import * as service from "./role.service"

export const getRolesController: RequestHandler = async (req, res) => {
    try {
        const dto = scheme.getRolesScheme.parse(req.query)
        const data = await service.getRolesService(dto)
        res.json(data)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(500)
            .send({
                msg: error.message || "Error al obtener roles"
            })
    }
}