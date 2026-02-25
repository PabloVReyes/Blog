import { z } from "zod"

////////////
// CREATE //
///////////

export const postCicleScheme = z.object({
    name: z.string()
})

export type PostCicleScheme = z.infer<typeof postCicleScheme>

export const postGpcScheme = z.object({
    title: z.string(),
    description: z.string(),
    cicle: z.string().uuid(),
    orderIndex: z.coerce.number()
})

export type PostGpcScheme = z.infer<typeof postGpcScheme>

//////////
// READ //
//////////

export const getGpcScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetGpcScheme = z.infer<typeof getGpcScheme>

export const downloadGpcFileSchema = z.object({
    id: z.string().uuid(),
})


////////////
// UPDATE //
////////////

export const putGpcScheme = z.object({
    title: z.string(),
    description: z.string(),
    cicle: z.string().uuid(),
    orderIndex: z.coerce.number()
})

export type PutGpcScheme = z.infer<typeof putGpcScheme>

export const putGpcParamsScheme = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteGpcParamsScheme = z.object({
    id: z.string().uuid()
})