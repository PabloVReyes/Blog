import { email, z } from "zod"

///
// CREATE //
///

export const postDirectoryScheme = z.object({
    phone: z.string(),
    name: z.string(),
    level: z.string(),
    boss: z.string(),
    secretary: z.string(),
    email: z.email()
})

export type PostDirectoryScheme = z.infer<typeof postDirectoryScheme>

/////
// READ //
/////

export const getDirectoryScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetDirectoryScheme = z.infer<typeof getDirectoryScheme>

////
// UPDATE //
////

export const putDirectoryScheme = z.object({
    phone: z.string(),
    name: z.string(),
    level: z.string(),
    boss: z.string(),
    secretary: z.string(),
    email: z.email()
})

export type PutDirectoryScheme = z.infer<typeof putDirectoryScheme>

export const putDirectoryParamsScheme = z.object({
    id: z.string().uuid()
})

///
// DELETE
///

export const deleteDirectoryParamsScheme = z.object({
    id: z.string().uuid()
})