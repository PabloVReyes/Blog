import { z } from "zod"

////////////
// UPDATE //
////////////

export const putCalendarSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    year: z.coerce.number().int().min(1900).max(2100),
    icon: z.string(),
    color: z.string(),
})

export type PutCalendarSchema = z.infer<typeof putCalendarSchema>

export interface CalendarUpdateDto extends PutCalendarSchema {
    file?: Express.Multer.File;
}

export const putCalendarParamsSchema = z.object({
    id: z.string().uuid()
})

export const downloadCalendarFileParamsSchema = z.object({
    id: z.string().uuid()
})