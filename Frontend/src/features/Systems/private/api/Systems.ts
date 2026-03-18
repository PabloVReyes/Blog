import { createCrudApi } from "@/lib"
import type { Systems, SystemsFilters } from "../types/systems.types"

export const systemsApi = createCrudApi<
    Systems,
    FormData,
    FormData,
    SystemsFilters
>("api/systems")

// 9 lineas