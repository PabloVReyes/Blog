import { z } from "zod"

////////////
// CREATE //
////////////

export const postRoleScheme = z.object({
    name: z.string(),
    description: z.string(),
    permissions: z.uuid().array()
})

export type PostRoleScheme = z.infer<typeof postRoleScheme>

//////////
// READ //
//////////

export const getRolesScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
})

export type GetRolesScheme = z.infer<typeof getRolesScheme>

////////////
// UPDATE //
////////////

export const putRoleScheme = z.object({
    name: z.string(),
    description: z.string(),
    permissions: z.uuid().array()
})

export type PutRoleScheme = z.infer<typeof putRoleScheme>

export const putRolesSchemeParams = z.object({
    id: z.uuid()
})

////////////
// DELETE //
////////////

export const deleteRoleParamsScheme = z.object({
    id: z.uuid()
}) 