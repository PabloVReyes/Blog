import { z } from "zod"

//////////
// READ //
//////////

export const getAreaWithManualsParamsSchema = z.object({
    id: z.string()
})

export const getManualsByTypeParamsSchema = z.object({
    type: z.string()
})

export const downloadManualFileParamsSchema = z.object({
    id: z.uuid()
})

export const getAreasSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetAreasSchema = z.infer<typeof getAreasSchema>

export const getManualsTypeSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetManualsTypeSchema = z.infer<typeof getManualsTypeSchema>

export const getManualsWithAreaSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetManualsWithAreaSchema = z.infer<typeof getManualsWithAreaSchema>

////////////
// UPDATE //
////////////

export const putManualParamsSchema = z.object({
    id: z.uuid()
})

export const putManualTypeSchema = z.object({
    code: z.string(),
    name: z.string(),
    color: z.string()
})

export type PutManualTypeSchema = z.infer<typeof putManualTypeSchema>

export const putManualTypeParamsSchema = z.object({
    id: z.uuid()
})

////////////
// DELETE //
////////////

export const deleteManualParamsSchema = z.object({
    id: z.uuid()
})