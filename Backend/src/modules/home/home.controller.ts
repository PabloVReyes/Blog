import { Request, RequestHandler, Response } from "express"
import * as service from "./home.service"
import { asyncHandler } from "../../utils/asyncHandler"

//////////
// READ //
//////////

export const getHomeController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getHomeSectionsService()
    res.json(data)
})

// 20 lineas -> 12 lineas