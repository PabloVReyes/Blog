import {z} from "zod"

export const downloadFileSchema = z.object({
    id: z.uuid()
})