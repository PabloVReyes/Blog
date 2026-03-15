import { z } from "zod"

export const updateSettingsSchema = z.object({
    name: z.string(),
    value: z.string()
})

export type UpdateSettingsSchema = z.infer<typeof updateSettingsSchema>