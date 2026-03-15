import { Request, RequestHandler, Response } from "express";
import * as  schema from "./codes.schema"
import * as service from "./codes.service"
import { asyncHandler } from "../../../utils/asyncHandler";

//////////
// READ //
//////////

export const getCodesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCodesSchema.parse(req.query)
    const data = await service.getCodesService(dto)
    res.json(data)
})

export const getCategorysController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getCategorysService()
    res.json(data)
})