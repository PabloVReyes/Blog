import { z } from "zod"

/////////////
// CREATED //
/////////////

export const postPbmSchema = z.object({
    title: z.string(),
})

export type PostPbmSchema = z.infer<typeof postPbmSchema>

//////////
// READ //
//////////

export const getPBMSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetPBMSchema = z.infer<typeof getPBMSchema>

export const downloadPBMFileSchema = z.object({
    id: z.string().uuid(),
})

////////////
// UPDATE //
////////////

export const putPBMSchema = z.object({
    title: z.string(),
})

export type PutPBMSchema = z.infer<typeof putPBMSchema>

export const putPBMParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deletePBMParamsSchema = z.object({
    id: z.string().uuid()
})