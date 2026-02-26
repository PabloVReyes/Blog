import { z } from "zod"

//////////
// READ //
//////////

export const getCodesSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    categoryId: z.string().uuid().optional()
})

export type GetCodesSchema = z.infer<typeof getCodesSchema>