import { z } from "zod"

////////////
// CREATE //
////////////

export const postCertificationSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    section: z.uuid()
})

export type PostCertificationSchema = z.infer<typeof postCertificationSchema>

export const postSectionSchema = z.object({
    name: z.string()
})

export type PostSectionSchema = z.infer<typeof postSectionSchema>

//////////
// READ //
//////////

export const getSectionWithCertificationsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetSectionWithCertificationsSchema = z.infer<typeof getSectionWithCertificationsSchema>

export const getCertificationsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
})

export type GetCertificationsSchema = z.infer<typeof getCertificationsSchema>

////////////
// UPDATE //
////////////

export const putCertificationSchema = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    section: z.uuid()
})

export type PutCertificationSchema = z.infer<typeof putCertificationSchema>

export const putCertificationParamsSchema = z.object({
    id: z.uuid()
})


//////////// 
// DELETE //
////////////

export const deleteCertificationParamsSchema = z.object({
    id: z.uuid()
})