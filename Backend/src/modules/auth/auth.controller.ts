import { Request, RequestHandler, Response } from "express"
import * as service from "./auth.service"
import { asyncHandler } from "../../utils/asyncHandler"

export const login: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const result = await service.login(email, password)
    res.json(result)
})