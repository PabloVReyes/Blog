import { z } from "zod"

////////////
// CREATE //
////////////

export const postCicleSchema = z.object({
    name: z.string()
})

export type PostCicleSchema = z.infer<typeof postCicleSchema>

export const postGpcSchema = z.object({
    title: z.string(),
    description: z.string(),
    cicle: z.string().uuid(),
    orderIndex: z.coerce.number()
})

export type PostGpcSchema = z.infer<typeof postGpcSchema>

//////////
// READ //
//////////

export const getGpcSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetGpcSchema = z.infer<typeof getGpcSchema>

export const downloadGpcFileSchema = z.object({
    id: z.string().uuid(),
})


////////////
// UPDATE //
////////////

export const putGpcSchema = z.object({
    title: z.string(),
    description: z.string(),
    cicle: z.string().uuid(),
    orderIndex: z.coerce.number()
})

export type PutGpcSchema = z.infer<typeof putGpcSchema>

export const putGpcParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteGpcParamsSchema = z.object({
    id: z.string().uuid()
})