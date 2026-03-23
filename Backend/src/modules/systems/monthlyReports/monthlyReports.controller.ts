import * as service from "./monthlyReports.service"
import { Request, RequestHandler, Response } from "express";
import * as schema from './monthlyReports.schema'
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postMonthlyReportsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostMonthlyReportsSchema = schema.postMonthlyReportsSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postMonthlyReportsService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getMonthlyReportsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getMonthlyReportsSchema.parse(req.query)
    const data = await service.getMonthlyReportsService(dto)
    res.json(data)
})

export const getPeriodsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getPeriodsService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putMonthlyReportsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putMonthlyReportsParamsSchema.parse(req.params)
    const body: schema.PutMonthlyReportsSchema = schema.putMonthlyReportsSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putMonthlyReportsService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteMonthlyReportsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteMonthlyReportsParamsSchema.parse(req.params)
    await service.deleteMonthlyReportsService(params.id)
    res.json({ success: true })
})

// 156 lienas -> 74 lineas -> 55 lineas