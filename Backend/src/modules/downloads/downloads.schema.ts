import { z } from "zod"

////////////
// CREATE //
////////////

export const postDownloadSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    type: z.enum(["DOCUMENT", "IMAGE"]),
    category: z.coerce.number()
})

export type PostDownloadSchema = z.infer<typeof postDownloadSchema>

export const postAreaSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PostAreaSchema = z.infer<typeof postAreaSchema>

export const postSectionSchema = z.object({
    name: z.string(),
    area: z.coerce.number()
})

export type PostSectionSchema = z.infer<typeof postSectionSchema>

export const postCategorySchema = z.object({
    name: z.string(),
    section: z.coerce.number()
})

export type PostCategorySchema = z.infer<typeof postCategorySchema>

//////////
// READ //
//////////

export const getDownloadsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetDownloadsSchema = z.infer<typeof getDownloadsSchema>

export const getAreaSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetAreaSchema = z.infer<typeof getAreaSchema>

export const getAreaWithDownloadsParamsSchema = z.object({
    slug: z.string()
})

export const getSectionsByAreaParamsSchema = z.object({
    area: z.coerce.number()
})

export const getCategoriesBySectionParamsSchema = z.object({
    section: z.coerce.number()
})

export const downloadFileParamsSchema = z.object({
    id: z.coerce.number()
})

////////////
// UPDATE //
////////////

export const putDownloadSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    type: z.enum(["DOCUMENT", "IMAGE"]),
    category: z.coerce.number()
})

export type PutDownloadSchema = z.infer<typeof putDownloadSchema>

export const putDownloadParamsSchema = z.object({
    id: z.coerce.number()
})

export const putAreaParamsSchema = z.object({
    id: z.coerce.number()
})

export const putAreaSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PutAreaSchema = z.infer<typeof putAreaSchema>