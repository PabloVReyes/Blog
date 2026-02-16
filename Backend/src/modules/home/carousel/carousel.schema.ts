import { z } from "zod"

/////////////
// CREATED //
/////////////

export const postCarouselSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    sectionId: z.string().uuid(),
    type: z.enum(['page', 'file', 'null']),
    url: z.string().optional().nullable(),
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean())
})

export type PostCarouselSchema = z.infer<typeof postCarouselSchema>

//////////
// READ //
//////////

export const getCarouselSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
    isActive: z
        .enum(["true", "false"])
        .optional()
        .transform((val) =>
            val === undefined ? undefined : val === "true"
        ),
})

export type GetCarouselSchema = z.infer<typeof getCarouselSchema>

export const downloadCarouselFileSchema = z.object({
    id: z.string().uuid()
})

////////////
// UPDATE //
////////////

export const putCarouselSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['page', 'file', 'null']),
    url: z.string().optional().nullable(),
    isActive: z.preprocess((val) => val === 'true' || val === true, z.boolean())
})

export const putCarouselParamsSchema = z.object({
    id: z.string().uuid()
})

export type PutCarouselSchema = z.infer<typeof putCarouselSchema> 

////////////
// DELETE //
////////////

export const deleteCarouselParamsSchema = z.object({
    id: z.string().uuid()
})