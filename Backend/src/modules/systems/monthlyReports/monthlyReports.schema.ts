import { z } from "zod"

////////////
// CREATE //
////////////

export const postMonthlyReportsSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['MONTHLY', 'ANNUAL', 'STATISTICAL', 'EXTRA']),
    month: z.coerce.number().min(1).max(12).optional(),
    year: z.coerce.number().int().min(1900).max(2100),
})

export type PostMonthlyReportsSchema = z.infer<typeof postMonthlyReportsSchema>

//////////
// READ //
//////////

export const getMonthlyReportsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    year: z.coerce.number().min(1900).max(2100).optional()
})

export type GetMonthlyReportsSchema = z.infer<typeof getMonthlyReportsSchema>

export const downloadMonthlyReportsFileSchema = z.object({
    id: z.string().uuid()
})

////////////
// UPDATE //
////////////

export const putMonthlyReportsSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['MONTHLY', 'ANNUAL', 'STATISTICAL', 'EXTRA']),
    month: z.coerce.number().min(1).max(12).optional(),
    year: z.coerce.number().int().min(1900).max(2100),
})

export type PutMonthlyReportsSchema = z.infer<typeof putMonthlyReportsSchema>

export const putMonthlyReportsParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteMonthlyReportsParamsSchema = z.object({
    id: z.string().uuid()
})