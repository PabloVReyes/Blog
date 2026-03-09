import { api } from "@/lib/axios.client"
import type { SystemProps } from "../../types"

export const addMonthlyReports = async (body: SystemProps) => {
    const response = await api.post(`/api/systems/monthly-reports/reports`, body)
    return response.data
}

export const fetchMonthlyReports = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/monthly-reports/reports/?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const updateMonthlyReports = async (id: string, body: SystemProps) => {
    const response = await api.put(`/api/systems/monthly-reports/reports/${id}`, body)
    return response.data
}

export const deleteMonthlyReports = async (id: string) => {
    const response = await api.delete(`/api/systems/monthly-reports/reports/${id}`)
    return response.data
}