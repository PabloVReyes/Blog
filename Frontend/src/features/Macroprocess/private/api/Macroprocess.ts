import { api } from "@/lib/axios.client"

export const fetchManuals = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/macroprocess?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const countManuals = async ({ search }: { search: string }) => {
    const response = await api.get(`/api/macroprocess/count?search=${search}`)
    return response.data
}

export const updateManual = async (id: string, body: any) => {
    const response = await api.put(`/api/macroprocess/${id}`, body)
    return response.data
}

export const deleteManual = async (id: string) => {
    const response = await api.delete(`/api/macroprocess/${id}`)
    return response.data
}