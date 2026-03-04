import { z } from "zod"

////
// CREATE
///

export const postCertificationScheme = z.object({
    name: z.string(),
    description: z.string().optional(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    section: z.coerce.number()
})

export type PostCertificationScheme = z.infer<typeof postCertificationScheme>

export const postSectionScheme = z.object({
    name: z.string()
})

export type PostSectionScheme = z.infer<typeof postSectionScheme>

//
// READ //
////

export const getSectionWithCertificationsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetSectionWithCertificationsScheme = z.infer<typeof getSectionWithCertificationsScheme>

export const getCertificationsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
})

export type GetCertificationsScheme = z.infer<typeof getCertificationsScheme>

export const downloadCertificationScheme = z.object({
    id: z.coerce.number()
})

///
// UPDATE //
///

export const putCertificationScheme = z.object({
    name: z.string(),
    description: z.string(),
    isNew: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    section: z.coerce.number()
})

export type PutCertificationScheme = z.infer<typeof putCertificationScheme>

export const putCertificationParamsScheme = z.object({
    id: z.coerce.number()
})


/////
// DELETE 
////

export const deleteCertificationParamsScheme = z.object({
    id: z.coerce.number()
})