import { z } from "zod"

////////////
// CREATE //
////////////

export const postClinicalPracticeGuidelinesSchema = z.object({
    title: z.string(),
    code: z.string(),
    category: z.string().uuid()
})

export type PostClinicalPracticeGuidelinesSchema = z.infer<typeof postClinicalPracticeGuidelinesSchema>

export const postCategorySchema = z.object({
    name: z.string()
})

export type PostCategorySchema = z.infer<typeof postCategorySchema>

//////////
// READ //
//////////

export const getClinicalPracticeGuidelinesSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    categoryId: z.string().uuid().optional()
})

export type GetClinicalPracticeGuidelinesSchema = z.infer<typeof getClinicalPracticeGuidelinesSchema>

export const downloadClinicalPracticeGuidelinesFileSchema = z.object({
    id: z.string().uuid(),
    type: z.enum(["ER", "RR"])
})

////////////
// UPDATE //
////////////

export const putClinicalPracticeGuidelinesSchema = z.object({
    title: z.string(),
    code: z.string(),
    category: z.string().uuid()
})

export type PutClinicalPracticeGuidelinesSchema = z.infer<typeof putClinicalPracticeGuidelinesSchema>

export const putClinicalPracticeGuidelinesParamsSchema = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteClinicalPracticeGuidelinesParamsSchema = z.object({
    id: z.string().uuid()
})