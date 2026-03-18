import { createCrudApi } from "@/lib"
import type { Vacation, VacationFilters } from "../types/vacation.types"

export const vacationApi = createCrudApi<
    Vacation,
    FormData,
    FormData,
    VacationFilters
>("api/vacation")

// 21 lineas -> 9 lineas