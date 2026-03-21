import { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import * as schema from "./files.schema"
import * as service from "./files.service"

export const downloadFile: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.downloadFileSchema.parse(req.params)
    const data = await service.downloadFileService(params.id)

    const mimeType = data.mimeType || "application/octet-stream"

    res.setHeader("Content-Type", mimeType)
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition")

    if (mimeType === "application/pdf") {
        res.setHeader(
            "Content-Disposition",
            `inline; filename="${data.name}"`
        )

        return res.sendFile(data.path)
    }

    return res.download(data.path, data.name)
})