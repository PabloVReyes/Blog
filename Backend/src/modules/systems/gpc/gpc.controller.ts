import { Request, RequestHandler, Response } from "express";
import * as schema from "./gpc.schema"
import * as service from "./gpc.service"
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postGpcController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostGpcSchema = schema.postGpcSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postGpcService(dto)
    res.json({ success: true })
})

export const postCycleController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCycleSchema = schema.postCycleSchema.parse(req.body)
    const data = await service.postCycleService(body)
    res.json(data)
})

//////////
// READ //
//////////

export const getCycleController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getCycleService()
    res.json(data)
})

export const getGpcController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getGpcSchema.parse(req.query)
    const data = await service.getGpcService(dto)
    res.json(data)
})

export const getCycleWithGpcController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getGpcSchema.parse(req.query)
    const data = await service.getCycleWithGpcService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putGpcController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putGpcParamsSchema.parse(req.params)
    const body: schema.PutGpcSchema = schema.putGpcSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putGpcService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteGpcController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteGpcParamsSchema.parse(req.params)
    await service.deleteGpcService(params.id)
    res.json({ success: true })
})

// 215 lineas -> 86 lineas