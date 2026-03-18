import { createCrudApi } from "@/lib"
import type { Juristic, JusristicFilters } from "../types/juristic.types"

export const juristicApi = createCrudApi<
    Juristic,
    FormData,
    FormData,
    JusristicFilters
>("api/juristics")

// 29 lineas -> 21 lineas -> 9 lineas