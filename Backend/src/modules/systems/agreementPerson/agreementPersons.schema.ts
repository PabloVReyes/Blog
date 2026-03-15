import { z } from "zod"

////////////
// CREATE //
////////////

export const postAgreementPersonsSchema = z.object({
    name: z.string(),
    group: z.coerce.number(),
    zone: z.coerce.number(),
    type: z.enum(["HOLDER", "DEPENDENT"]),
    holder: z.coerce.number().optional()
})

export type PostAgreementPersonsSchema = z.infer<typeof postAgreementPersonsSchema>

export const postZoneSchema = z.object({
    name: z.string()
})

export type PostZoneSchema = z.infer<typeof postZoneSchema>


export const postGroupSchema = z.object({
    name: z.string()
})

export type PostGroupSchema = z.infer<typeof postGroupSchema>

//////////
// READ //
//////////

export const getAgreementPersonsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    zoneId: z.coerce.number().optional(),
    groupId: z.coerce.number().optional()
})

export type GetAgreementPersonsSchema = z.infer<typeof getAgreementPersonsSchema>

////////////
// UPDATE //
////////////

export const putAgreementPersonsSchema = z.object({
    name: z.string(),
    group: z.coerce.number(),
    zone: z.coerce.number(),
    type: z.enum(["HOLDER", "DEPENDENT"]),
    holder: z.coerce.number().optional()
})

export type PutAgreementPersonsSchema = z.infer<typeof putAgreementPersonsSchema>

export const putAgreementPersonsParamsSchema = z.object({
    id: z.coerce.number()
})

////////////
// DELETE //
////////////

export const deleteAgreementPersonsParamsSchema = z.object({
    id: z.coerce.number()
})