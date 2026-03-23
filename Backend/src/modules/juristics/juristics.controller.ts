import { Request, RequestHandler, Response } from "express"
import * as schema from "./juristics.schema"
import * as service from "./juristics.service"
import { asyncHandler } from "../../utils/asyncHandler"

////////////
// CREATE //
////////////

export const postJuristicController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostJuristicSchema = schema.postJuristicSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postJuristicService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getJuristicsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getJuristicsSchema.parse(req.query)
    const data = await service.getJuristicsService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putJuristicController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putJuristicsParamsSchema.parse(req.params)
    const body: schema.PutJuristicsSchema = schema.putJuristicsSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putJuristicService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteJuristicController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteJuristicsParamsSchema.parse(req.params)
    await service.deleteJuristicsService(params.id)
    res.json({ success: true })
})

// 160 lineas -> 70 lineas