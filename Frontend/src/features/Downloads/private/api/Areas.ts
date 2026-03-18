import { createCrudApi } from "@/lib"
import type { AreaFilters, Area } from "../types/areas.types"

export const downloadAreaApi = createCrudApi<
    Area,
    Partial<Area>,
    Partial<Area>,
    AreaFilters
>("/api/downloads/areas")

// 29 lineas  -> 24 lineas -> 9 lineas