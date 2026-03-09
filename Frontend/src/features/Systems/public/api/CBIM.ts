import { api } from "@/lib"

export const fecthCBIM = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/cbim?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}