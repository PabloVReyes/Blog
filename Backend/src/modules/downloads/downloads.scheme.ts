import { z } from "zod"

////////////
// CREATE //
////////////

export const postAreaSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PostAreaSchema = z.infer<typeof postAreaSchema>

//////////
// READ //
//////////

export const getAreaSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetAreaSchema = z.infer<typeof getAreaSchema>

export const getAreaWithDownloadsParamsSchema = z.object({
    slug: z.string()
})

////////////
// UPDATE //
////////////

export const putAreaParamsScheme = z.object({
    id: z.coerce.number()
})

export const putAreaSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PutAreaSchema = z.infer<typeof putAreaSchema>