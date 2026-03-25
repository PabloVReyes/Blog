import { z } from "zod"

////////
// CREATE //
////

export const postStandardSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.uuid()
})

export type PostStandardSchema = z.infer<typeof postStandardSchema>

export const postCategorySchema = z.object({
    name: z.string()
})

export type PostCategorySchema = z.infer<typeof postCategorySchema>

//
// READ //
///

export const getStandardSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetStandardSchema = z.infer<typeof getStandardSchema>

export const downloadStandardSchema = z.object({
    id: z.coerce.number()
})

////////////
// UPDATE //
////////////

export const putStandardSchema = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.uuid()
})

export type PutStandardSchema = z.infer<typeof putStandardSchema>

export const putStandarParamsSchema = z.object({
    id: z.uuid()
})

////////////
// DELETE //
////////////

export const deleteStandarParamsSchema = z.object({
    id: z.uuid()
})