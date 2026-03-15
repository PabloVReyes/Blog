import { Request, RequestHandler, Response } from "express";
import * as schema from "./system.schema"
import * as service from "./system.service";
import * as fs from "fs"
import { asyncHandler } from "../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postSystemController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostSystemSchema = schema.postSystemSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    await service.postSystemService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getSystemsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getSystemSchema.parse(req.query)
    const data = await service.getSystemService(dto)
    res.json(data)
})

export const downloadSystemFileController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.downloadSystemFileSchema.parse(req.params)
    const data = await service.downloadSystemFileService(params.id)

    res.setHeader("Content-Type", "application/pdf"); // 👈 importante

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

////////////
// UPDATE //
////////////

export const puySystemController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putSystemParamsSchema.parse(req.params)
    const body: schema.PutSystemSchema = schema.putSystemSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putSystemService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteSystemController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteSystemParamsSchema.parse(req.params)
    await service.deteleSystemService(params.id)
    res.json({ success: true })
})

// 161 lineas -> 69 lineas