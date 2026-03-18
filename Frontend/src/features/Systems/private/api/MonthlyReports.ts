import { createCrudApi } from "@/lib"
import type { MonthlyReports, MonthyReportsFilters } from "../types/monthlyReports.types"

export const systemsMonthlyReportsApi = createCrudApi<
    MonthlyReports,
    FormData,
    FormData,
    MonthyReportsFilters
>("api/systems/monthly-reports/reports")

// 32 lineas -> 9 lineas 