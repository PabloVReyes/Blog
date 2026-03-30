import { z } from "zod"

export const createUserSchema = z.object({
    active: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    name: z.string(),
    email: z.email(),
    roles: z.uuid().array()
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

//////////
// READ //
//////////

export const getUsersSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetUsersSchema = z.infer<typeof getUsersSchema>

////////////
// UPDATE //
////////////

export const putUserSchema = z.object({
    active: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    name: z.string(),
    email: z.email(),
    roles: z.uuid().array()
})

export type PutUserSchema = z.infer<typeof putUserSchema>

export const putUserParamsSchema = z.object({
    id: z.uuid()
})

export const putMeSchema = z.object({
    name: z.string(),
    email: z.email(),
})

export type PutMeSchema = z.infer<typeof putMeSchema>

export const putMeParamsSchema = z.object({
    id: z.uuid()
})

export const resetPasswordParamsSchema = z.object({
    id: z.uuid()
})

export const changePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(128, 'La contraseña no puede exceder 128 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

export const changePasswordParamsSchema = z.object({
    id: z.uuid()
})

export const changeMePasswordSchema = z.object({
    password: z.string(),
})

export const deleteUserParamsSchema = z.object({
    id: z.uuid()
})