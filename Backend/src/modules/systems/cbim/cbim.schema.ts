import { z } from "zod"

////////////
// CREATE //
////////////

export const postCbimSchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    sp: z.string().optional().nullable(),
    fpgc: z.string().optional().nullable(),
    cbt_cae: z.enum(["CAE", "CBT"])
})

export type PostCbimSchema = z.infer<typeof postCbimSchema>

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

export const putCbimSchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    sp: z.string().optional().nullable(),
    fpgc: z.string().optional().nullable(),
    cbt_cae: z.enum(["CAE", "CBT"])
})

export type PutCbimSchema = z.infer<typeof putCbimSchema>

export const putCbimParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteCbimParamsSchema = z.object({
    id: z.string().uuid()
})