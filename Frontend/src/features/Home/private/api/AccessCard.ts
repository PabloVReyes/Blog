import { createCrudApi } from "@/lib"
import type { AccessCardFilters } from "../types/accessCard.types"

export const homeAccessCardApi = createCrudApi<
    AccessCardFilters,
    FormData,
    FormData,
    AccessCardFilters
>("api/home/accesscard")

// 22 lineas -> 9 lineas