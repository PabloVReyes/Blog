import { Request, RequestHandler, Response } from "express";
import * as service from "./careProtocols.service"
import * as schema from "./careProtocols.schema";
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postCareProtocolsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCareProtocolsSchema = schema.postCareProtocolsSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postCareProtocolsService(dto)
    res.json({ success: true })
})

export const postCategoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCategorySchema = schema.postCategorySchema.parse(req.body)
    const data = await service.postCategoryService(body)
    res.json(data)
})

//////////
// READ //
//////////

export const getCategoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getCategoryService()
    res.json(data)
})

export const getCareProtocolsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCareProtocolsSchema.parse(req.query)
    const data = await service.getCareProtocolsService(dto)
    res.json(data)
})

export const getCategoryWithCareProtocolsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCareProtocolsSchema.parse(req.query)
    const data = await service.getCategoryWithCareProtocolsService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putCareProtocolsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putCareProtocolsParamsSchema.parse(req.params)
    const body: schema.PutCareProtocolsSchema = schema.putCareProtocolsSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putCareProtocolsService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteCareProtocolController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteCareProtocolsParamsSchema.parse(req.params)
    await service.deleteCareProtocolsService(params.id)
    res.json({ success: true })
})

// 196 lineas -> 85 lineas -> 67 lineas