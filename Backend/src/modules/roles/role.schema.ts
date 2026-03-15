import { z } from "zod"

////////////
// CREATE //
////////////

export const postRoleSchema = z.object({
    name: z.string(),
    description: z.string(),
    permissions: z.uuid().array()
})

export type PostRoleSchema = z.infer<typeof postRoleSchema>

//////////
// READ //
//////////

export const getRolesSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
})

export type GetRolesSchema = z.infer<typeof getRolesSchema>

////////////
// UPDATE //
////////////

export const putRoleSchema = z.object({
    name: z.string(),
    description: z.string(),
    permissions: z.uuid().array()
})

export type PutRoleSchema = z.infer<typeof putRoleSchema>

export const putRolesSchemaParams = z.object({
    id: z.uuid()
})

////////////
// DELETE //
////////////

export const deleteRoleParamsSchema = z.object({
    id: z.uuid()
}) 