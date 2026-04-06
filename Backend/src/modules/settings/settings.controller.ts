import { Request, RequestHandler, Response } from "express";
import * as service from "./settings.service"
import * as schema from "./settings.schema"
import { asyncHandler } from "../../utils/asyncHandler";

//////////
// READ //
//////////

export const settingsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.settingsService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const updateSettingsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.UpdateSettingsSchema = schema.updateSettingsSchema.parse(req.body)
    await service.updateSettingsService(body)
    res.json({ success: true })
})

export const uploadFaviconController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const file = req.file
    const data = await service.uploadFaviconService(file)
    res.json(data)
})

export const uploadFooterController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const file = req.file
    const data = await service.uploadFooterService(file)
    res.json(data)
})