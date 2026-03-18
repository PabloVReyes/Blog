import { buildParams } from "@/lib"
import { api } from "@/lib/axios.client"

export const fetchCIE10 = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/cie-10?${buildParams({ page, limit, search })}`)
    return response.data
}