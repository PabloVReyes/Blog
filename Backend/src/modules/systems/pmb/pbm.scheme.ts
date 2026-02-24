import { z } from "zod"

/////////////
// CREATED //
/////////////

export const postPbmScheme = z.object({
    title: z.string(),
})

export type PostPbmScheme = z.infer<typeof postPbmScheme>

//////////
// READ //
//////////

export const getPBMScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetPBMScheme = z.infer<typeof getPBMScheme>

export const downloadPBMFileSchema = z.object({
    id: z.string().uuid(),
})

////////////
// UPDATE //
////////////

export const putPBMScheme = z.object({
    title: z.string(),
})

export type PutPBMScheme = z.infer<typeof putPBMScheme>

export const putPBMParamsScheme = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deletePBMParamsScheme = z.object({
    id: z.string().uuid()
})