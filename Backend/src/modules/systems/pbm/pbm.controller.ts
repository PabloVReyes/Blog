import { Request, RequestHandler, Response } from "express";
import * as schema from "./pbm.schema"
import * as service from "./pbm.service"
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postPbmController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostPbmSchema = schema.postPbmSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postPbmService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getPBMController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getPBMSchema.parse(req.query)
    const data = await service.getPBMService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putPBMController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putPBMParamsSchema.parse(req.params)
    const body: schema.PutPBMSchema = schema.putPBMSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putPBMService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deletePBMController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deletePBMParamsSchema.parse(req.params)
    await service.daletePBMService(params.id)
    res.json({ success: true })
})

// 240 lineas -> 68 lineas -> 50 lineas