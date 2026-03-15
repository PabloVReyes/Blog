import { Request, RequestHandler, Response } from "express";
import * as schema from "./clinicalPracticeGuidelines.schema"
import * as service from "./clinicalPracticeGuidelines.service"
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postClinicalPracticeGuidelinesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostClinicalPracticeGuidelinesSchema = schema.postClinicalPracticeGuidelinesSchema.parse(req.body)
    const files = req.files as {
        er?: Express.Multer.File[];
        rr?: Express.Multer.File[]
    }
    const er = files?.er?.[0];
    const rr = files?.rr?.[0];
    const dto = { ...body, er, rr }
    await service.postClinicalPracticeGuidelinesService(dto)
    res.json({ success: true })
})

export const postCategoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCategorySchema = schema.postCategorySchema.parse(req.body)
    const data = await service.postCategoryService(body)
    res.json(data)
})

//////////
// READ //
//////////

export const downloadClinicalPracticeGuidelinesFileController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.downloadClinicalPracticeGuidelinesFileSchema.parse(req.params)
    const data = await service.downloadClinicalPracticeGuidelinesFileService(params.id, params.type)

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `inline; filename="${data.fileName}"`
    );

    res.setHeader(
        "Access-Control-Expose-Headers",
        "Content-Disposition"
    );

    fs.createReadStream(data.filePath).pipe(res);
})

export const getClinicalPracticeGuidelinesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getClinicalPracticeGuidelinesSchema.parse(req.query)
    const data = await service.getClinicalPracticeGuidelinesService(dto)
    res.json(data)
})

export const getCategoryController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getCategoryService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putClinicalPracticeGuidelinesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putClinicalPracticeGuidelinesParamsSchema.parse(req.params)
    const body: schema.PutClinicalPracticeGuidelinesSchema = schema.putClinicalPracticeGuidelinesSchema.parse(req.body)
    const files = req.files as {
        er?: Express.Multer.File[];
        rr?: Express.Multer.File[]
    }
    const er = files?.er?.[0];
    const rr = files?.rr?.[0];

    const dto = { ...body, er, rr }

    const data = await service.putClinicalPracticeGuidelinesService(params.id, dto)

    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteClinicalPracticeGuidelinesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteClinicalPracticeGuidelinesParamsSchema.parse(req.params)
    await service.daleteClinicalPracticeGuidelinesService(params.id)
    res.json({ success: true })
})

// 216 lineas -> 92 lineas