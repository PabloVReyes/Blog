import { z } from "zod"

////////
// CREATE //
////

export const postStandardScheme = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PostStandardScheme = z.infer<typeof postStandardScheme>

export const postCategoryScheme = z.object({
    name: z.string()
})

export type PostCategoryScheme = z.infer<typeof postCategoryScheme>

//
// READ //
///

export const getStandardScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetStandardScheme = z.infer<typeof getStandardScheme>

export const downloadStandardScheme = z.object({
    id: z.coerce.number()
})

///
// UPDATE 
//

export const putStandardScheme = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PutStandardScheme = z.infer<typeof putStandardScheme>

export const putStandarParamsScheme = z.object({
    id: z.coerce.number()
})

///
// DELETE
//

export const deleteStandarParamsScheme = z.object({
    id: z.coerce.number()
})