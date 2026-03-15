import { Request, RequestHandler, Response } from "express";
import * as service from "./derechohabiencia.service"
import * as schema from "./derechohabiencia.schema"
import { asyncHandler } from "../../../utils/asyncHandler";

//////////
// READ //
//////////

export const getDerechohabienciaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getDerechohabienciaService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putDerechohabienciaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putDerechohabienciaParamsSchema.parse(req.params)
    const body = schema.putDerechohabienciaSchema.parse(req.body)
    const data = await service.putDerechohabienciaService(params.id, body)
    res.json(data)
})

// 52 lineas -> 24 lineas