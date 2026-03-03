import { z } from "zod"

////////
// CREATE //
////

export const postStandarScheme = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PostStandarScheme = z.infer<typeof postStandarScheme>

export const postCategoryScheme = z.object({
    name: z.string()
})

export type PostCategoryScheme = z.infer<typeof postCategoryScheme>

//
// READ //
///

export const getStandarScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetStandarScheme = z.infer<typeof getStandarScheme>

export const downloadStandarScheme = z.object({
    id: z.coerce.number()
})

///
// UPDATE 
//

export const putStandarScheme = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    category: z.coerce.number()
})

export type PutStandarScheme = z.infer<typeof putStandarScheme>

export const putStandarParamsScheme = z.object({
    id: z.coerce.number()
})

///
// DELETE
//

export const deleteStandarParamsScheme = z.object({
    id: z.coerce.number()
})