import { z } from "zod"

export const createUserScheme = z.object({
    active: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    name: z.string(),
    email: z.email(),
    roles: z.uuid().array()
})

export type CreateUserScheme = z.infer<typeof createUserScheme>

//////////
// READ //
//////////

export const getUsersScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetUsersScheme = z.infer<typeof getUsersScheme>

////////////
// UPDATE //
////////////

export const putUserScheme = z.object({
    active: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    name: z.string(),
    email: z.email(),
    roles: z.uuid().array()
})

export type PutUserScheme = z.infer<typeof putUserScheme>

export const putUserParamsScheme = z.object({
    id: z.uuid()
})

export const resetPasswordParamsScheme = z.object({
    id: z.uuid()
})

export const deleteUserParamsScheme = z.object({
    id: z.uuid()
})