import { Request, Response } from "express"
import * as service from "./auth.service"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await service.login(email, password)
        res.json(result)
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        })
    }
}