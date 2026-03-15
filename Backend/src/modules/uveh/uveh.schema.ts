import z from "zod"

////////////
// CREATE //
////////////

export const postDownloadSchema = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PostDownloadSchema = z.infer<typeof postDownloadSchema>

export const postCategorySchema = z.object({
    name: z.string()
})

export type PostCategorySchema = z.infer<typeof postCategorySchema>

//////////
// READ //
//////////

export const getCategoryWithDownloadsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetCategoryWithDownloadsSchema = z.infer<typeof getCategoryWithDownloadsSchema>

export const getDownloadsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetDownloadsSchema = z.infer<typeof getDownloadsSchema>

export const downloadFileSchema = z.object({
    id: z.coerce.number()
})

///
// UPDATE //
//

export const putDownloadSchema = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PutDownloadSchema = z.infer<typeof putDownloadSchema>

export const putDownloadParamsSchema = z.object({
    id: z.coerce.number()
})

//
// DELETE
//

export const deleteDownloadParamsSchema = z.object({
    id: z.coerce.number()
})