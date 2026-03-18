import { createCrudApi } from "@/lib"
import type { AlertFilters, Alert } from "../types/alert.types"

export const homeCarouselApi = createCrudApi<
    Alert,
    Partial<Alert>,
    Partial<Alert>,
    AlertFilters
>("api/home/carousel")

// 23 lineas -> 9 lineas