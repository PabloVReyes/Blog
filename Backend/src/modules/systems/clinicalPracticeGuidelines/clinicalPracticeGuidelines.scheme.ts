import { z } from "zod"

/////////////
// CREATED //
/////////////

export const postClinicalPracticeGuidelinesScheme = z.object({
    title: z.string(),
    code: z.string(),
    category: z.string().uuid()
})

export type PostClinicalPracticeGuidelinesScheme = z.infer<typeof postClinicalPracticeGuidelinesScheme>

export const postCategorySchema = z.object({
    name: z.string()
})

export type PostCategorySchema = z.infer<typeof postCategorySchema>

//////////
// READ //
//////////

export const getClinicalPracticeGuidelinesScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    categoryId: z.string().uuid()
})

export type GetClinicalPracticeGuidelinesScheme = z.infer<typeof getClinicalPracticeGuidelinesScheme>

export const downloadClinicalPracticeGuidelinesFileSchema = z.object({
    id: z.string().uuid(),
    type: z.enum(["ER", "RR"])
})

////////////
// UPDATE //
////////////

export const putClinicalPracticeGuidelinesScheme = z.object({
    title: z.string(),
    code: z.string(),
    category: z.string().uuid()
})

export type PutClinicalPracticeGuidelinesScheme = z.infer<typeof putClinicalPracticeGuidelinesScheme>

export const putClinicalPracticeGuidelinesParamsScheme = z.object({
    id: z.string().uuid()
})

////////////
// DELETE //
////////////

export const deleteClinicalPracticeGuidelinesParamsScheme = z.object({
    id: z.string().uuid()
})