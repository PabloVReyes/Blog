import { buildParams } from "@/lib"
import { api } from "@/lib/axios.client"

export const fetchMonthlyReports = async (year?: number, search?: string) => {
    const response = await api.get(`/api/systems/monthly-reports/reports?${buildParams({ year, search })}`)
    return response.data
}

export const fetchPeriods = async () => {
    const response = await api.get(`/api/systems/monthly-reports/periods`)
    return response.data
}