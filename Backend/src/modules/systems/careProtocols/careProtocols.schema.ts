import { title } from "node:process"
import { z } from "zod"

////////////
// CREATE //
////////////

export const postCategorySchema = z.object({
    name: z.string()
})

export type PostCategorySchema = z.infer<typeof postCategorySchema>

export const postCareProtocolsSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().uuid()
})

export type PostCareProtocolsSchema = z.infer<typeof postCareProtocolsSchema>

//////////
// READ //
//////////

export const getCareProtocolsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetCareProtocolsSchema = z.infer<typeof getCareProtocolsSchema>

export const downloadCareProtocolFileSchema = z.object({
    id: z.string().uuid(),
})

////////////
// UPDATE //
////////////

export const putCareProtocolsSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().uuid()
})

export type PutCareProtocolsSchema = z.infer<typeof putCareProtocolsSchema>

export const putCareProtocolsParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteCareProtocolsParamsSchema = z.object({
    id: z.string().uuid()
})