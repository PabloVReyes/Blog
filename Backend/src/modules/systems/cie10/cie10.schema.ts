import { z } from "zod"

////////////
// CREATE //
////////////

export const postCie10Shema = z.object({
    code: z.string(),
    name: z.string()
})

export type PostCie10Schema = z.infer<typeof postCie10Shema>

//////////
// READ //
//////////

export const getCie10Schema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetCie10Schema = z.infer<typeof getCie10Schema>

////////////
// UPDATE //
////////////

export const putCie10Shema = z.object({
    code: z.string(),
    name: z.string()
})

export type PutCie10Schema = z.infer<typeof putCie10Shema>

export const putCie10ParamsSchema = z.object({
    id: z.string()
})

////////////
// DELETE //
////////////

export const deleteCie10ParamsSchema = z.object({
    id: z.string()
})