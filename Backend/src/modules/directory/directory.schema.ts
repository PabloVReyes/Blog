import { email, z } from "zod"

////////////
// CREATE //
////////////

export const postDirectorySchema = z.object({
    phone: z.string(),
    name: z.string(),
    level: z.string(),
    boss: z.string().optional(),
    secretary: z.string().optional(),
    email: z.string().optional()
})

export type PostDirectorySchema = z.infer<typeof postDirectorySchema>

//////////
// READ //
//////////

export const getDirectorySchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetDirectorySchema = z.infer<typeof getDirectorySchema>

////////////
// UPDATE //
////////////

export const putDirectorySchema = z.object({
    phone: z.string(),
    name: z.string(),
    level: z.string(),
    boss: z.string().optional(),
    secretary: z.string().optional(),
    email: z.string().optional()
})

export type PutDirectorySchema = z.infer<typeof putDirectorySchema>

export const putDirectoryParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteDirectoryParamsSchema = z.object({
    id: z.string().uuid()
})