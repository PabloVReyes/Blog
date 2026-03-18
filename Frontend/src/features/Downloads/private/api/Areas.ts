import { buildParams } from "@/lib"
import { api } from "@/lib/axios.client"

export const addArea = async (body: any) => {
    const response = await api.post(`/api/downloads/areas`, body)
    return response.data
}

export const fetchAreas = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/downloads/areas?${buildParams({page, limit, search})}`)
    return response.data
}

export const updateArea = async (id: string, body: any) => {
    const response = await api.put(`/api/downloads/areas/${id}`, body)
    return response.data
}

export const deleteArea = async (id: number) => {
    const response = await api.delete(`/api/downloads/areas/${id}`)
    return response.data
}

// 29 lineas  -> 24 lineas