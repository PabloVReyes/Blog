import { buildParams } from "@/lib"
import { api } from "@/lib/axios.client"

export const fetchAreas = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/macroprocess/areas?${buildParams({ page, limit, search })}`)
    return response.data
}

interface Props {
    name: string
}

export const updateArea = async (id: string, body: Props) => {
    const response = await api.put(`/api/macroprocess/areas/${id}`, body)
    return response.data
}