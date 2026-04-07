import { RequestHandler, Request, Response } from "express";
import * as schema from "./downloads.schema"
import * as service from "./downloads.service"
import { asyncHandler } from "../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postDownloadController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostDownloadSchema = schema.postDownloadSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postDownloadService(dto)
    res.json({ success: true })
})

export const postDownloadAreaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostAreaSchema = schema.postAreaSchema.parse(req.body)
    await service.postAreaService(body)
    res.json({ success: true })
})

export const postSectionController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostSectionSchema = schema.postSectionSchema.parse(req.body)
    const data = await service.postSectionService(body)
    res.json(data)
})

export const postCategoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCategorySchema = schema.postCategorySchema.parse(req.body)
    const data = await service.postCategoryService(body)
    res.json(data)
})

//////////
// READ //
//////////

export const getDownloadsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getDownloadsSchema.parse(req.query)
    const data = await service.getDownloadsService(dto)
    res.json(data)
})

export const getAreasController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getAreaSchema.parse(req.query)
    const data = await service.getAreasService(dto)
    res.json(data)
})

export const getAreasWithDownloadsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.getAreaWithDownloadsParamsSchema.parse(req.params)
    const data = await service.getAreaWithDownloadsService(params.slug)
    res.json(data)
})

export const getSectionsByAreaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.getSectionsByAreaParamsSchema.parse(req.params)
    const data = await service.getSectionsByAreaService(params.area)
    res.json(data)
})

export const getCategoriesBySectionController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.getCategoriesBySectionParamsSchema.parse(req.params)
    const data = await service.getCategoriesBySectionService(params.section)
    res.json(data)
})

////////////
// UPLOAD //
////////////

export const putDownloadController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putDownloadParamsSchema.parse(req.params)
    const body: schema.PutDownloadSchema = schema.putDownloadSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putDownloadService(params.id, dto)
    res.json(data)
})

export const putAreaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putAreaParamsSchema.parse(req.params)
    const body: schema.PutAreaSchema = schema.putAreaSchema.parse(req.body)
    const data = await service.putAreaService(params.id, body)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteDownloadController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putDownloadParamsSchema.parse(req.params)
    await service.deleteDownloadService(params.id)
    res.json({ success: true })
})

export const deleteAreaController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putAreaParamsSchema.parse(req.params)
    await service.deleteAreaService(params.id)
    res.json({ success: true })
})

// 348 lineas -> 120 lineas -> 104 lineas