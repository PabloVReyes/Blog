import z from "zod"

///
// CREATE //
////

export const postVacationScheme = z.object({
    shift: z.coerce.number(),
    type: z.enum(["CALENDAR", "INDEX"])
})

export type PostVacationScheme = z.infer<typeof postVacationScheme>

export const postShiftScheme = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string(),
})

export type PostShiftScheme = z.infer<typeof postShiftScheme>

export const downloadVacationScheme = z.object({
    id: z.coerce.number()
})

///
// READ
//

export const getShiftsWithFilesScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetShiftsWithFilesScheme = z.infer<typeof getShiftsWithFilesScheme>

export const getShiftsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetShiftsScheme = z.infer<typeof getShiftsScheme>

export const getVacationsScheme = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional(),
})

export type GetVacationssScheme = z.infer<typeof getVacationsScheme>


///
// UPDATE
//

export const putShiftScheme = z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string()
})

export type PutShiftScheme = z.infer<typeof putShiftScheme>

export const PutShiftParamsScheme = z.object({
    id: z.coerce.number()
})

export const putVacationScheme = z.object({
    shift: z.coerce.number(),
    type: z.enum(["CALENDAR", "INDEX"])
})

export type PutVacationScheme = z.infer<typeof putVacationScheme>

export const PutVacationParamsScheme = z.object({
    id: z.coerce.number()
})

//
// DELETE 
//

export const deleteShiftParamsScheme = z.object({
    id: z.coerce.number()
})

export const deleteVacationParamsScheme = z.object({
    id: z.coerce.number()
})
