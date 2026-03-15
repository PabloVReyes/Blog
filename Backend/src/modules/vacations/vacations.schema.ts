import z from "zod"

///
// CREATE //
////

export const postVacationSchema = z.object({
    shift: z.coerce.number(),
    type: z.enum(["CALENDAR", "INDEX"])
})

export type PostVacationSchema = z.infer<typeof postVacationSchema>

export const postShiftSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string(),
})

export type PostShiftSchema = z.infer<typeof postShiftSchema>

export const downloadVacationSchema = z.object({
    id: z.coerce.number()
})

///
// READ
//

export const getShiftsWithFilesSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetShiftsWithFilesSchema = z.infer<typeof getShiftsWithFilesSchema>

export const getShiftsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetShiftsSchema = z.infer<typeof getShiftsSchema>

export const getVacationsSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetVacationssSchema = z.infer<typeof getVacationsSchema>


///
// UPDATE
//

export const putShiftSchema = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PutShiftSchema = z.infer<typeof putShiftSchema>

export const PutShiftParamsSchema = z.object({
    id: z.coerce.number()
})

export const putVacationSchema = z.object({
    shift: z.coerce.number(),
    type: z.enum(["CALENDAR", "INDEX"])
})

export type PutVacationSchema = z.infer<typeof putVacationSchema>

export const PutVacationParamsSchema = z.object({
    id: z.coerce.number()
})

//
// DELETE 
//

export const deleteShiftParamsSchema = z.object({
    id: z.coerce.number()
})

export const deleteVacationParamsSchema = z.object({
    id: z.coerce.number()
})
