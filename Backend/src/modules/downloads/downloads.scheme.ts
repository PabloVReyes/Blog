import { z } from "zod"

////////////
// CREATE //
////////////

export const postDownloadScheme = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    type: z.enum(["DOCUMENT", "IMAGE"]),
    category: z.coerce.number()
})

export type PostDownloadScheme = z.infer<typeof postDownloadScheme>

export const postAreaSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PostAreaSchema = z.infer<typeof postAreaSchema>

export const postSectionScheme = z.object({
    name: z.string(),
    area: z.coerce.number().optional()
})

export type PostSectionScheme = z.infer<typeof postSectionScheme>

export const postCategoryScheme = z.object({
    name: z.string(),
    section: z.coerce.number()
})

export type PostCategoryScheme = z.infer<typeof postCategoryScheme>

//////////
// READ //
//////////

export const getDownloadsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetDownloadsScheme = z.infer<typeof getDownloadsScheme>

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

export const getCategoriesBySectionParamsScheme = z.object({
    section: z.coerce.number()
})

export const downloadFileParamsScheme = z.object({
    id: z.coerce.number()
})

////////////
// UPDATE //
////////////

export const putDownloadScheme = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    type: z.enum(["DOCUMENT", "IMAGE"]),
    category: z.coerce.number()
})

export type PutDownloadScheme = z.infer<typeof putDownloadScheme>

export const putDownloadParamsScheme = z.object({
    id: z.coerce.number()
})

export const putAreaParamsScheme = z.object({
    id: z.coerce.number()
})

export const putAreaSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PutAreaSchema = z.infer<typeof putAreaSchema>