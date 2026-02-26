import { title } from "node:process"
import { z } from "zod"

////////////
// CREATE //
////////////

export const postCategoryScheme = z.object({
    name: z.string()
})

export type PostCategoryScheme = z.infer<typeof postCategoryScheme>

export const postCareProtocolsSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().uuid()
})

export type PostCareProtocolsScheme = z.infer<typeof postCareProtocolsSchema>

//////////
// READ //
//////////

export const getCareProtocolsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetCareProtocolsScheme = z.infer<typeof getCareProtocolsScheme>

export const downloadCareProtocolFileSchema = z.object({
    id: z.string().uuid(),
})

////////////
// UPDATE //
////////////

export const putCareProtocolsScheme = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().uuid()
})

export type PutCareProtocolsScheme = z.infer<typeof putCareProtocolsScheme>

export const putCareProtocolsParamsScheme = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteCareProtocolsParamsScheme = z.object({
    id: z.string().uuid()
})