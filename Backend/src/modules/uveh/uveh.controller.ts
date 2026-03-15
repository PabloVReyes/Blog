import { Request, RequestHandler, Response } from "express";
import * as schema from "./uveh.schema"
import * as service from "./uveh.service"
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

export const getCategoriesWithDownloadsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCategoryWithDownloadsSchema.parse(req.query)
    const data = await service.getCategoriesWithDownloadsService(dto)
    res.json(data)
})

export const getDownloadsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getDownloadsSchema.parse(req.query)
    const data = await service.getDownloadsService(dto)
    res.json(data)
})

export const downloadFileController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.downloadFileSchema.parse(req.params)
    const data: any = await service.downloadFileService(params.id)

    const mimeType = data.mimeType || "application/octet-stream"

    res.setHeader("Content-Type", mimeType)
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition")

    if (mimeType === "application/pdf") {
        res.setHeader(
            "Content-Disposition",
            `inline; filename="${data.fileName}"`
        )

        return res.sendFile(data.filePath)
    }

    return res.download(data.filePath, data.fileName)
})

////////////
// UPDATE //
////////////

export const putDownloadController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putDownloadParamsSchema.parse(req.params)
    const body: schema.PutDownloadSchema = schema.putDownloadSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putDownloadService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteDownloadController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteDownloadParamsSchema.parse(req.params)
    await service.deleteDownloadService(params.id)
    res.json({ success: true })
})

// 217 lineas -> 89 lineas