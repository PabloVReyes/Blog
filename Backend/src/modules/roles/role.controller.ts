import { Request, RequestHandler, Response } from "express";
import * as schema from "./role.schema"
import * as service from "./role.service"
import { asyncHandler } from "../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postRoleController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostRoleSchema = schema.postRoleSchema.parse(req.body)
    await service.postRoleService(body)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getRolesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getRolesSchema.parse(req.query)
    const data = await service.getRolesService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putRoleController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putRolesSchemaParams.parse(req.params)
    const body: schema.PutRoleSchema = schema.putRoleSchema.parse(req.body)
    const data = await service.putRoleService(params.id, body)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteRoleController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteRoleParamsSchema.parse(req.params)
    await service.deleteRoleService(params.id)
    res.json({ success: true })
})

// 112 lineas -> 45 lineas