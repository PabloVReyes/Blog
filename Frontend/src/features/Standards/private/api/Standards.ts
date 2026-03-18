import { createCrudApi } from "@/lib"
import type { Standards, StandardsFilter } from "../types/standards.type"

export const standardsApi = createCrudApi<
    Standards,
    FormData,
    FormData,
    StandardsFilter
>("api/standards")

// 29 lineas -> 21 lineas -> 9 lineas
