import { buildParams } from "@/lib"
import { api } from "@/lib/axios.client"

export const fetchManuals = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/macroprocess?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateManual = async (id: string, body: FormData) => {
    const response = await api.put(`/api/macroprocess/${id}`, body)
    return response.data
}

export const deleteManual = async (id: string) => {
    const response = await api.delete(`/api/macroprocess/${id}`)
    return response.data
}