import { RequestHandler, Request, Response } from "express";
import * as service from "./accesscard.service"
import * as schema from "./accesscard.schema"
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postAccessCardController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostAccessCardSchema = schema.postAccessCardSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postAccessCardService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getAccessCardController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getAccesscardSchema.parse(req.query)
    const data = await service.getAccessCardService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putAccessCardController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putAccessCardParamsSchema.parse(req.params)
    const body: schema.PutAccessCardSchema = schema.putAccessCardSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putAccessCardService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteAccessCardController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteAccessCardParamsSchema.parse(req.params)
    service.deleteAccessCardService(params.id)
    res.json({ success: true })
})

// 156 lineas -> 69 lineas