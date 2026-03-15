import * as schema from "./agreementPersons.schema";
import { Request, RequestHandler, Response } from "express";
import * as service from "./agreementPerson.service"
import { asyncHandler } from "../../../utils/asyncHandler";

////////////
// CREATE //
////////////

export const postAgreementPersonController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostAgreementPersonsSchema = schema.postAgreementPersonsSchema.parse(req.body)
    await service.postAgreementPersonService(body)
    res.json({ success: true })
})

export const postZoneController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostZoneSchema = schema.postZoneSchema.parse(req.body)
    const data = await service.postZoneService(body)
    res.json(data)
})

export const postGroupController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const body: schema.PostGroupSchema = schema.postGroupSchema.parse(req.body)
    const data = await service.postGroupService(body)
    res.json(data)
})


//////////
// READ //
//////////

export const getAgreementPersonWithDependentsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getAgreementPersonsSchema.parse(req.query)
    const data = await service.getAgreementPersonWithDependentsService(dto)
    res.json(data)
})

export const getAgreementPersonController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const dto = schema.getAgreementPersonsSchema.parse(req.query)
    const data = await service.getAgreementPersonService(dto)
    res.json(data)
})

export const getGroupsController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getGroupService()
    res.json(data)
})

export const getZonesController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getZonesService()
    res.json(data)
})

////////////
// UPDATE //
////////////

export const putAgreementPersonController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.putAgreementPersonsParamsSchema.parse(req.params)
    const body: schema.PutAgreementPersonsSchema = schema.putAgreementPersonsSchema.parse(req.body)
    const data = await service.putAgreementPersonService(params.id, body)
    res.json(data)
})

////////////
// DELETE //
////////////

export const deleteAgreementPersonController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const params = schema.deleteAgreementPersonsParamsSchema.parse(req.params)
    await service.deleteAgreementPersonService(params.id)
    res.json({ success: true })
})