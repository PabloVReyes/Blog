import { Request, RequestHandler, Response } from "express"
import * as service from "./user.service"
import * as schema from "./user.schema"
import { asyncHandler } from "../../utils/asyncHandler"

////////////
// CREATE //
////////////

export const createUserController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.CreateUserSchema = schema.createUserSchema.parse(req.body)
    await service.createUserService(body)
    res.json({ success: true })
})

//////////
// READ //
//////////

export const getUsersController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getUsersSchema.parse(req.query)
    const data = await service.getUsersService(dto)
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putMeController: RequestHandler = asyncHandler(async (req: any, res: Response) => {
    const params = schema.putMeParamsSchema.parse(req.params)
    if (req.user.id !== params.id) {
        return res.status(403).json({ message: 'Acceso denegado' })
    }
    const body: schema.PutMeSchema = schema.putMeSchema.parse(req.body)
    const data = await service.putMeService(params.id, body)
    res.json(data)
})

export const putUserController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putUserParamsSchema.parse(req.params)
    const body: schema.PutUserSchema = schema.putUserSchema.parse(req.body)
    const data = await service.putUserService(params.id, body)
    res.json(data)
})

export const resetPasswordController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.resetPasswordParamsSchema.parse(req.params)
    const data = await service.resetPasswordService(params.id)
    res.json(data)
})

export const changePasswordController: RequestHandler = asyncHandler(async (req: any, res: Response) => {
    const params = schema.changePasswordParamsSchema.parse(req.params)
    if (req.user.id !== params.id) {
        return res.status(403).json({ message: 'Acceso denegado' })
    }
    const body: schema.ChangePasswordSchema = schema.changePasswordSchema.parse(req.body)
    await service.changePasswordService(params.id, body)
    res.json({ success: true })
})

////////////
// DELETE //
////////////

export const deleteUserController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteUserParamsSchema.parse(req.params)
    await service.deleteUserService(params.id)
    res.json({ success: true })
})

// 199 lineas -> 71 lineas