import { createCrudApi } from "@/lib"
import type { UVEH, UVEHFilters } from "../types/UVEH.types"

export const UVEHApi = createCrudApi<
    UVEH,
    FormData,
    FormData,
    UVEHFilters
>("api/uveh")

// 30 lineas -> 9 lineas