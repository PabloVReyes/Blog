import { createCrudApi } from "@/lib"
import type { CIE10Filters, CIE10 } from "../types/CIE10.types"

export const systemsCIE10Api = createCrudApi<
    CIE10,
    Partial<CIE10>,
    Partial<CIE10>,
    CIE10Filters
>("api/systems/cie-10")

// 24 lineas -> 9 lineas