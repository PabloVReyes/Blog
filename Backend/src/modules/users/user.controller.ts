import { Request, Response } from "express"
import * as service from "./user.service"

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await service.createUser(req.body)
        res.json(user)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}