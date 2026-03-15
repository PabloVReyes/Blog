import { z } from "zod"

////////////
// CREATE //
////////////

export const postJuristicSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
})

export type PostJuristicSchema = z.infer<typeof postJuristicSchema>

//////////
// READ //
//////////

export const getJuristicsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetJuristicsSchema = z.infer<typeof getJuristicsSchema>

export const downloadJuristicsSchema = z.object({
    id: z.coerce.number()
})

////
// UPDATE 
/////



export const putJuristicsSchema = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
})

export type PutJuristicsSchema = z.infer<typeof putJuristicsSchema>

export const putJuristicsParamsSchema = z.object({
    id: z.coerce.number()
})

///
// DELETE //
//

export const deleteJuristicsParamsSchema = z.object({
    id: z.coerce.number()
})