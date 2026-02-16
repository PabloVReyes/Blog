import { z } from "zod";

////////////
// CREATE //
////////////

export const postSystemSchema = z.object({
    acronym: z.string().optional(),
    name: z.string().optional(),
    description: z.string(),
    icon: z.string(),
    color: z.string(),
    url: z.string().optional(),
    type: z.enum(['page', 'file'])
})

export type PostSystemSchema = z.infer<typeof postSystemSchema>

//////////
// READ //
//////////

export const getSystemSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetSystemSchema = z.infer<typeof getSystemSchema>

export const downloadSystemFileSchema = z.object({
    id: z.string().uuid()
})

////////////
// UPDATE //
////////////

export const putSystemSchema = z.object({
    acronym: z.string().optional(),
    name: z.string().optional(),
    description: z.string(),
    icon: z.string(),
    color: z.string(),
    url: z.string().optional(),
    type: z.enum(['page', 'file'])
})

export type PutSystemSchema = z.infer<typeof putSystemSchema>

export const putSystemParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteSystemParamsSchema = z.object({
    id: z.string().uuid()
})