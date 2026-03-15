import z from "zod";

//////////
// READ //
//////////

export const getAdverseEventsParamsSchema = z.object({
    type: z.string().optional()
})

export type GetAdverseEventsParamsSchema = z.infer<typeof getAdverseEventsParamsSchema>

////////////
// UPDATE //
////////////

export const putAdverseEventsParamsSchema = z.object({
    id: z.string().uuid()
})

export const downloadAdverseEventFileSchema = z.object({
    type: z.string()
})