import { Request, RequestHandler, Response } from "express";
import * as schema from "./permission.schema"
import * as service from "./permission.service"
import { asyncHandler } from "../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postPermissionController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostPermissionsSchema = schema.postPermissionsSchema.parse(req.body)
    await service.postPermissionsService(body)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getPermissionsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getPermissionsSchema.parse(req.query)
    const data = await service.getPermissionsService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putPermissionController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putPermissionParamsSchema.parse(req.params)
    const body: schema.PostPermissionsSchema = schema.postPermissionsSchema.parse(req.body)
    const data = await service.putPermissionsService(params.id, body)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deletePermissionController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deletePermissionParamsSchema.parse(req.params)
    await service.deletePermissionService(params.id)
    res.json({ success: true })
})

// 96 lineas -> 45 lineas