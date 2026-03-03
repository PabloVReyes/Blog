import { z } from "zod"

////////////
// CREATE //
////////////

export const postJuristicScheme = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
})

export type PostJuristicScheme = z.infer<typeof postJuristicScheme>

//////////
// READ //
//////////

export const getJuristicsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetJuristicsScheme = z.infer<typeof getJuristicsScheme>

export const downloadJuristicsScheme = z.object({
    id: z.coerce.number()
})

////
// UPDATE 
/////



export const putJuristicsScheme = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
})

export type PutJuristicsScheme = z.infer<typeof putJuristicsScheme>

export const putJuristicsParamsScheme = z.object({
    id: z.coerce.number()
})

///
// DELETE //
//

export const deleteJuristicsParamsScheme = z.object({
    id: z.coerce.number()
})