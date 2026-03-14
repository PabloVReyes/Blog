import z from "zod";

//////////
// READ //
//////////

export const getAdverseEventsParamsScheme = z.object({
    type: z.string().optional()
})

export type GetAdverseEventsParamsScheme = z.infer<typeof getAdverseEventsParamsScheme>

////////////
// UPDATE //
////////////

export const putAdverseEventsParamsScheme = z.object({
    id: z.string().uuid()
})

export const downloadAdverseEventFileScheme = z.object({
    type: z.string()
})