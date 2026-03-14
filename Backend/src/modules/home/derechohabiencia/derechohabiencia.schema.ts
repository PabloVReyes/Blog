import { z } from "zod"

export const putDerechohabienciaParamsSchema = z.object({
    id: z.string().uuid()
})

export const linkShema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    url: z.string().url()
})

export const putDerechohabienciaSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    color: z.string(),
    links: z.array(linkShema)
})

export type PutDerechohabienciaParams = z.infer<typeof putDerechohabienciaParamsSchema>;
export type PutDerechohabienciaBody = z.infer<typeof putDerechohabienciaSchema>;