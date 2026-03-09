import { api } from "@/lib/axios.client"

export const fecthCIE10 = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/cie-10?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}