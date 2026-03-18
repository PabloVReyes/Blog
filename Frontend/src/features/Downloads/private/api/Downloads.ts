import { createCrudApi } from "@/lib"
import type { Download, DownloadFilters } from "../types/download.types"

export const downloadApi = createCrudApi<
    Download,
    FormData,
    FormData,
    DownloadFilters
>("/api/downloads")

// 29 lineas -> 23 lineas -> 9 lineas