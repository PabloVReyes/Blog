import { buildParams } from "@/lib"
import { api } from "@/lib/axios.client"

export const fetchAreas = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/macroprocess/areas?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateArea = async (id: string, body: any) => {
    const response = await api.put(`/api/macroprocess/areas/${id}`, body)
    return response.data
}