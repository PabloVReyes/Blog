import { Request, RequestHandler, Response } from "express";
import * as schema from "./directory.schema"
import * as service from "./directory.service"
import { asyncHandler } from "../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postDirectoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostDirectorySchema = schema.postDirectorySchema.parse(req.body)
    const dto = { ...body }
    await service.postDirectoryService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getDirectoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getDirectorySchema.parse(req.query)
    const data = await service.getDirectoryService(dto)
    res.json(data)
})

export const getLevelsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getLevelsService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putDirectoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putDirectoryParamsSchema.parse(req.params)
    const body: schema.PutDirectorySchema = schema.putDirectorySchema.parse(req.body)
    const dto = { ...body }
    const data = await service.putDirectoryService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteDirectoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteDirectoryParamsSchema.parse(req.params)
    await service.deleteDirectoryService(params.id)
    res.json({ success: true })
})

// 123 lineas -> 52 lineas