import { createCrudApi } from "@/lib"
import type { JuristicData, JuristicFilter } from "../../types/juristic.types"

export const juristicApi = createCrudApi<
    JuristicData,
    FormData,
    FormData,
    JuristicFilter
>("api/juristics")

// 29 lineas -> 21 lineas -> 9 lineas