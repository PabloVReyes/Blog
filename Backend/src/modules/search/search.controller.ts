import * as service from "./search.service"
import { Request, RequestHandler, Response } from "express"
import * as schema from "./search.schema"
import { asyncHandler } from "../../utils/asyncHandler"

//////////
// READ //
//////////

export const getSearchController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getSearchSchema.parse(req.query)
    const data = await service.getSearchService(dto)
    res.json(data)
})

// 16 lineas -> 14 lineas