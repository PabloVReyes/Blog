import { createCrudApi } from "@/lib"
import type { Shift, ShiftFilters } from "../types/shift.types"

export const vacationShiftApi = createCrudApi<
    Shift,
    Partial<Shift>,
    Partial<Shift>,
    ShiftFilters
>("api/vacation/shifts")

// 22 lineas -> 9 lineas