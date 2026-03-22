import { Request, RequestHandler, Response } from "express"
import * as service from "./carousel.service"
import * as schema from "./carousel.schema"
import * as fs from "fs"
import { asyncHandler } from "../../../utils/asyncHandler"

////////////
// CREATE //
////////////

export const postCarouselController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostCarouselSchema = schema.postCarouselSchema.parse(req.body)
    const files = req.files as {
        image?: Express.Multer.File[];
        file?: Express.Multer.File[];
    };
    const imageFile = files?.image?.[0];
    const contentFile = files?.file?.[0];
    const dto = { ...body, imageFile, contentFile }
    await service.postCarouselService(dto)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getCarouselController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getCarouselSchema.parse(req.query)
    const data = await service.getCarouselService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putCarouselController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putCarouselParamsSchema.parse(req.params)
    const body: schema.PutCarouselSchema = schema.putCarouselSchema.parse(req.body)
    const files = req.files as {
        image?: Express.Multer.File[]
        file?: Express.Multer.File[]
    }
    const imageFile = files?.image?.[0]
    const contentFile = files?.file?.[0]
    const dto = { ...body, imageFile, contentFile }
    const data = await service.putCarouselService(params.id, dto)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteCarouselController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteCarouselParamsSchema.parse(req.params)
    await service.deleteCarouselService(params.id)
    res.json({ success: true })
})

// 151 lineas -> 77 lineas