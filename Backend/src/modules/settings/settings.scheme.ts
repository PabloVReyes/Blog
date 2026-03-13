import { z } from "zod"

export const updateSettingsScheme = z.object({
    name: z.string(),
    value: z.string()
})

export type UpdateSettingsScheme = z.infer<typeof updateSettingsScheme>