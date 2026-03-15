import { Request, RequestHandler, Response } from "express";
import * as service from "./calendar.service"
import * as schema from "./calendar.schema"
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler";

//////////
// READ //
//////////

export const getCalendarController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getCalendarService()
    res.json(data)
})

export const downloadCalendarFileController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.downloadCalendarFileParamsSchema.parse(req.params)
    const data = await service.downloadCalendarFileService(params.id)

    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${data.fileName}"`
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

export const putCalendarController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putCalendarParamsSchema.parse(req.params)
    const body: schema.PutCalendarSchema = schema.putCalendarSchema.parse(req.body)
    const file = req.file
    const dto = { ...body, file }
    const data = await service.putCalendarService(params.id, dto)
    res.json(data)
})

// 95 lineas -> 44 lineas