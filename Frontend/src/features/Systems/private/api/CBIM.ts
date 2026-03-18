import { createCrudApi } from "@/lib"
import type { CBIM, CBIMFilters } from "../types/CBIM.types"

export const systemsCBIMApi = createCrudApi<
    CBIM,
    Partial<CBIM>,
    Partial<CBIM>,
    CBIMFilters
>("api/systems/cbim")

// 30 lineas -> 9 lineas