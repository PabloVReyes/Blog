import * as service from "./vacations.service"
import * as schema from "./vacations.schema"
import { Request, RequestHandler, Response } from "express"
import { asyncHandler } from "../../utils/asyncHandler"

///////////
// CRATE //
///////////

export const postShiftController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostShiftSchema = schema.postShiftSchema.parse(req.body)
    const dto = { ...body }
    await service.postShiftService(dto)
    res.json({ success: true })
})

export const postVacationController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostVacationSchema = schema.postVacationSchema.parse(req.body)
    const file = req.file;
    const dto = { ...body, file }
    await service.postVacationService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getVacationsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getVacationsSchema.parse(req.query)
    const data = await service.getVacationsService(dto)
    res.json(data)
})

export const getShilftsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getShiftsSchema.parse(req.query)
    const data = await service.getShiftsService(dto)
    res.json(data)
})

export const getShiftWithVacationsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getShiftsWithFilesSchema.parse(req.query)
    const data = await service.getShiftWithVacationsService(dto)
    res.json(data)
})

export const downloadVacationFileController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.downloadVacationSchema.parse(req.params)
    const data: any = await service.downloadVacationsFileService(params.id)

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

export const putVacationController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.PutVacationParamsSchema.parse(req.params)
    const body: schema.PutVacationSchema = schema.putVacationSchema.parse(req.body)
    const file = req.file;
    const dto = { ...body, file }
    const data = await service.putVacationService(params.id, dto)
    res.json(data)
})

export const putShiftController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.PutShiftParamsSchema.parse(req.params)
    const body: schema.PutShiftSchema = schema.putShiftSchema.parse(req.body)
    const dto = { ...body }
    const data = await service.putShiftService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteShiftController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteShiftParamsSchema.parse(req.params)
    await service.deleteShiftService(params.id)
    res.json({ success: true })
})

export const deleteVacationController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteVacationParamsSchema.parse(req.params)
    await service.deleteVacationService(params.id)
    res.json({ success: true })
})