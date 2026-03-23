import { Request, RequestHandler, Response } from "express";
import * as schema from "./uveh.schema"
import * as service from "./uveh.service"
import { asyncHandler } from "../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postUVEHController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostDownloadSchema = schema.postDownloadSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postUVEHService(dto)
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

export const getCategoriesWithUVEHController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCategoryWithDownloadsSchema.parse(req.query)
    const data = await service.getCategoriesWithUVEHService(dto)
    res.json(data)
})

export const getUVEHController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getDownloadsSchema.parse(req.query)
    const data = await service.getUVEHService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putUVEHController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putDownloadParamsSchema.parse(req.params)
    const body: schema.PutDownloadSchema = schema.putDownloadSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putUVEHService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteUVEHController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteDownloadParamsSchema.parse(req.params)
    await service.deleteUVEHService(params.id)
    res.json({ success: true })
})

// 217 lineas -> 89 lineas