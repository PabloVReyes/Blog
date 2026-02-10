import { api } from "@/services/axios.client"

export const fetchAreas = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/macroprocess/areas?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const countAreas = async ({ search }: { search: string }) => {
    const response = await api.get(`/api/macroprocess/areas/count?search=${search}`)
    return response.data
}

export const updateArea = async (id: string, body: any) => {
    const response = await api.put(`/api/macroprocess/areas/${id}`, body)
    return response.data
}