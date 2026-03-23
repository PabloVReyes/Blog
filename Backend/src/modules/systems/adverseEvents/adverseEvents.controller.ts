import { RequestHandler, Request, Response } from "express";
import * as service from "./adverseEvents.service"
import * as schema from "./adverseEvents.schema";
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

//////////
// READ //
//////////

export const getAdverseEventsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getAdverseEventsService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putAdverseEventsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putAdverseEventsParamsSchema.parse(req.params)
    const file = req.file
    const data = await service.putAdverseEventService(params.id, file)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteAdverseEventController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putAdverseEventsParamsSchema.parse(req.params)
    const data = await service.deleteAdverseEventService(params.id)
    res.json(data)
})

// 120 lineas -> 53 lineas -> 35 lineas