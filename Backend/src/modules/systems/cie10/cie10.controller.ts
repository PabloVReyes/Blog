import { Request, RequestHandler, Response } from "express";
import * as schema from "./cie10.schema"
import * as service from "./cie10.service"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postCie10Controller: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCie10Schema = schema.postCie10Schema.parse(req.body)
    await service.postCie10Service(body)
    res.json({ sucess: true })
})

//////////
// READ //
//////////

export const getCie10Controller: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCie10Schema.parse(req.query)
    const data = await service.getCie10Service(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putCie10Controller: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putCie10ParamsSchema.parse(req.params)
    const body: schema.PutCie10Schema = schema.putCie10Schema.parse(req.body)
    const data = await service.putCie10Service(params.id, body)
    res.json(data)
})


////////////
// DELETE //
////////////


export const deleteCie10Controller: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteCie10ParamsSchema.parse(req.params)
    await service.deleteCie10Service(params.id)
    res.json({ success: true })
})

// 115 lineas -> 48 lineas