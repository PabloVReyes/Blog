import { Request, RequestHandler, Response } from "express"
import * as schema from "./standards.schema"
import * as service from "./standards.service"
import { asyncHandler } from "../../utils/asyncHandler"

////////////
// CREATE //
////////////

export const postStandarController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostStandardSchema = schema.postStandardSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postSdantardService(dto)
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

export const getCategoriesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getCategoriesService()
    res.json(data)
})

export const getSdandarsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getStandardSchema.parse(req.query)
    const data = await service.getStandardsService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putStandarController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putStandarParamsSchema.parse(req.params)
    const body: schema.PutStandardSchema = schema.putStandardSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putStandardService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteStandarController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteStandarParamsSchema.parse(req.params)
    await service.deleteStandardService(params.id)
    res.json({ success: true })
})

// 200 lineas -> 80 lineas -> 60 lineas