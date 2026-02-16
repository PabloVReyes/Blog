import { z } from "zod"

export const putAlertSchema = z.object({
    id: z.string().uuid(), // valida que sea un UUID
    icon: z.string().optional(),
    isActive: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    color: z.string().optional(),
})

export type PutAlertSchema = z.infer<typeof putAlertSchema>