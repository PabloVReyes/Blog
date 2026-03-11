import { z } from "zod"

////////////
// CREATE //
////////////

export const postPermissionsScheme = z.object({
    name: z.string(),
    key: z.string(),
    description: z.string(),
    active: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
})

export type PostPermissionsScheme = z.infer<typeof postPermissionsScheme>

//////////
// READ //
//////////

export const getPermissionsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
})

export type GetPermissionsScheme = z.infer<typeof getPermissionsScheme>

////////////
// UPDATE //
////////////

export const putPermissionParamsScheme = z.object({
    id: z.string()
})

/////
// DELETE //
////////////

export const deletePermissionParamsScheme = z.object({
    id: z.string()
})