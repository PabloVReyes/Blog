import { RequestHandler, Request, Response } from "express"
import * as schema from "./certification.schema"
import * as service from "./certification.service"
import { asyncHandler } from "../../utils/asyncHandler"

////////////
// CREATE //
////////////

export const postCertificationController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCertificationSchema = schema.postCertificationSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postCertificationService(dto)
    res.json({ success: true })
})

export const postSectionController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostSectionSchema = schema.postSectionSchema.parse(req.body)
    const data = await service.postSectionService(body)
    res.json(data)
})

//////////
// READ //
//////////

export const getSectionWithCertificationsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getSectionWithCertificationsSchema.parse(req.query)
    const data = await service.getSectionsWithCertificationsService(dto)
    res.json(data)
})

export const getSectionsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getSectionsService()
    res.json(data)
})

export const getCertificationsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCertificationsSchema.parse(req.query)
    const data = await service.getCertificationsService(dto)
    res.json(data)
})

export const downloadCertificationFileController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.downloadCertificationSchema.parse(req.params)
    const data: any = await service.downloadCertificationFileService(params.id)

    const mimeType = data.mimeType || "application/octet-stream"

    res.setHeader("Content-Type", mimeType)
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition")

    // 👇 Si es PDF → visualizar inline
    if (mimeType === "application/pdf") {
        res.setHeader(
            "Content-Disposition",
            `inline; filename="${data.fileName}"`
        )

        return res.sendFile(data.filePath)
    }

    // 👇 Cualquier otro archivo → forzar descarga
    return res.download(data.filePath, data.fileName)
})

////////////
// UPDATE //
////////////

export const putCertificationController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putCertificationParamsSchema.parse(req.params)
    const body: schema.PutCertificationSchema = schema.putCertificationSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putCertificationService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteCertificationController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteCertificationParamsSchema.parse(req.params)
    await service.deleteCertificationService(params.id)

    res.json({ success: true })
})

// 201 lineas -> 90 lineas