import { z } from "zod"

////////////
// CREATE //
////////////

export const postPermissionsSchema = z.object({
    name: z.string(),
    key: z.string(),
    description: z.string(),
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
})

export type PostPermissionsSchema = z.infer<typeof postPermissionsSchema>

//////////
// READ //
//////////

export const getPermissionsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
})

export type GetPermissionsSchema = z.infer<typeof getPermissionsSchema>

////////////
// UPDATE //
////////////

export const putPermissionParamsSchema = z.object({
    id: z.string()
})

/////
// DELETE //
////////////

export const deletePermissionParamsSchema = z.object({
    id: z.string()
})