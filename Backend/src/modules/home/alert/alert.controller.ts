import { RequestHandler, Response, Request } from "express";
import * as service from "./alert.service"
import * as schema from "./alert.schema"
import { asyncHandler } from "../../../utils/asyncHandler";

//////////
// READ //
//////////

export const getAlertController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getAlertService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putAlertService: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.putAlertSchema.parse({
        id: req.params.id,
        ...req.body
    })
    const data = await service.putAlertService(dto)
    res.json(data)
})

// 41 lineas -> 26 lineas