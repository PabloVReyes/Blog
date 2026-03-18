import { buildParams } from "@/lib"
import { api } from "@/lib/axios.client"

export const fetchManualsTypes = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/macroprocess/manuals?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateManualType = async (id: string, body: any) => {
    const response = await api.put(`/api/macroprocess/manuals/${id}`, body)
    return response.data
}