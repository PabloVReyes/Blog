import { createCrudApi } from "@/lib"
import type { CarouselData, CarouselFilters } from "../../types/carousel.types"

export const homeCarouselApi = createCrudApi<
    CarouselData,
    FormData,
    FormData,
    CarouselFilters
>("api/home/carousel")

// 23 lineas -> 9 lineas