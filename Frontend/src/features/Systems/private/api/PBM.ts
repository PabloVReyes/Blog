import { createCrudApi } from "@/lib"
import type { PBM, PBMFilters } from "../types/PBM.types"

export const systemsPBMApi = createCrudApi<
    PBM,
    FormData,
    FormData,
    PBMFilters
>("api/systems/pbm")

// 22 lineas -> 9 lineas