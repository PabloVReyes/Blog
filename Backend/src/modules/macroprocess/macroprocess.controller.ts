import * as service from "./macroprocess.service"
import { Request, RequestHandler, Response } from "express";
import * as schema from "./macroprocess.schema"
import { asyncHandler } from "../../utils/asyncHandler";

//////////
// READ //
//////////

export const getManualByTypeController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.getManualsByTypeParamsSchema.parse(req.params)
    const data = await service.getManualByTypeService(params.type)
    res.json(data)
})

export const getAreaWithManualsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.getAreaWithManualsParamsSchema.parse(req.params)
    const data = await service.getAreaWithManualsService(params.id)
    res.json(data)
})

export const getAreasController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const query = schema.getAreasSchema.parse(req.query)
    const data = await service.getAreasService(query)
    res.json(data)
})

export const getManualsTypeController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const query = schema.getManualsTypeSchema.parse(req.query)
    const data = await service.getManualsTypeService(query)
    res.json(data)
})

export const getManualsWithAreaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const query = schema.getManualsTypeSchema.parse(req.query)
    const data = await service.getManualsWithAreaService(query)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putManualTypeController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putManualTypeParamsSchema.parse(req.params)
    const body: schema.PutManualTypeSchema = schema.putManualTypeSchema.parse(req.body)
    const data = await service.putManualTypeService(params.id, body)
    res.json(data)
})

export const putManualController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putManualParamsSchema.parse(req.params)
    const file = req.file
    const data = await service.putManualService(params.id, file)
    res.json(data)
})

export const putAreaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.putAreaService(req)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteManualController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteManualParamsSchema.parse(req.params)
    const data = await service.deleteManualService(params.id)
    res.json(data)
})