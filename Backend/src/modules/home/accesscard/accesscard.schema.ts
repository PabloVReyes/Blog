import { z } from "zod"

////////////
// CREATE //
////////////

export const postAccessCardSchema = z.object({
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    sectionId: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    type: z.enum(['page', 'file']),
    url: z.string().optional().nullable(),
    color: z.string(),
    icon: z.string()
})

export type PostAccessCardSchema = z.infer<typeof postAccessCardSchema>

//////////
// READ //
//////////

export const getAccesscardSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    isActive: z
        .enum(["true", "false"])
        .optional()
        .transform((val) =>
            val === undefined ? undefined : val === "true"
        ),
})

export type GetAccessCardSchema = z.infer<typeof getAccesscardSchema>

export const downloadAccessCardFileSchema = z.object({
    id: z.string().uuid()
})

////////////
// UPDATE //
////////////

export const putAccessCardSchema = z.object({
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    title: z.string(),
    description: z.string(),
    type: z.enum(['page', 'file']),
    url: z.string().optional().nullable(),
    color: z.string(),
    icon: z.string()
})

export type PutAccessCardSchema = z.infer<typeof putAccessCardSchema>

export const putAccessCardParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteAccessCardParamsSchema = z.object({
    id: z.string().uuid()
})