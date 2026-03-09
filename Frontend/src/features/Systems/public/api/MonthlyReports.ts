import { api } from "@/lib/axios.client"

export const fetchMonthlyReports = async (year?: number | null, search?: string) => {
    const response = await api.get(`/api/systems/monthly-reports/reports?year=${year}&search=${search}`)
    return response.data
}

export const fetchPeriods = async () => {
    const response = await api.get(`/api/systems/monthly-reports/periods`)
    return response.data
}

export const downloadMonthlyReports = async (id: string) => {
    const response = await api.get(`/api/systems/monthly-reports/reports/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
