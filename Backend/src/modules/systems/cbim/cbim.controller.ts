import { Request, RequestHandler, Response } from "express";
import * as schema from "./cbim.schema";
import * as service from "./cbim.service"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postCbimController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCbimSchema = schema.postCbimSchema.parse(req.body)
    await service.postCbimService(body)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getCbimController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCbimSchema.parse(req.query)
    const data = await service.getCbimService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putCbimController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putCbimParamsSchema.parse(req.params)
    const body: schema.PutCbimSchema = schema.putCbimSchema.parse(req.body)
    const data = await service.putCbimService(params.id, body)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteCbimController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteCbimParamsSchema.parse(req.params)
    await service.deleteCbimService(params.id)
    res.json({ success: true })
})

// 121 lineas -> 45 lineas