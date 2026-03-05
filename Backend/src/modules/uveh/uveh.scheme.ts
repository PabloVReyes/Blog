import z from "zod"

////////////
// CREATE //
////////////

export const postDownloadScheme = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PostDownloadScheme = z.infer<typeof postDownloadScheme>

export const postCategoryScheme = z.object({
    name: z.string()
})

export type PostCategoryScheme = z.infer<typeof postCategoryScheme>

//////////
// READ //
//////////

export const getCategoryWithDownloadsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetCategoryWithDownloadsScheme = z.infer<typeof getCategoryWithDownloadsScheme>

export const getDownloadsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetDownloadsScheme = z.infer<typeof getDownloadsScheme>

export const downloadFileScheme = z.object({
    id: z.coerce.number()
})

///
// UPDATE //
//

export const putDownloadScheme = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PutDownloadScheme = z.infer<typeof putDownloadScheme>

export const putDownloadParamsScheme = z.object({
    id: z.coerce.number()
})

//
// DELETE
//

export const deleteDownloadParamsScheme = z.object({
    id: z.coerce.number()
})