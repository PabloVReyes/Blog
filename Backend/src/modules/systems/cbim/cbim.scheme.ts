import { z } from "zod"

////////////
// CREATE //
////////////

export const postCbimShema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    sp: z.string().optional(),
    fpgc: z.string().optional(),
    cbt_cae: z.enum(["CAE", "CBT"])
})

export type PostCbimSchema = z.infer<typeof postCbimShema>

//////////
// READ //
//////////

export const getCbimSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetCbimSchema = z.infer<typeof getCbimSchema>

////////////
// UPDATE //
////////////

export const putCbimShema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    sp: z.string().optional(),
    fpgc: z.string().optional(),
    cbt_cae: z.enum(["CAE", "CBT"])
})

export type PutCbimSchema = z.infer<typeof putCbimShema>

export const putCbimParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteCbimParamsSchema = z.object({
    id: z.string().uuid()
})