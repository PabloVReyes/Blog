import { z } from "zod"

export const getUsersScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetUsersScheme = z.infer<typeof getUsersScheme>