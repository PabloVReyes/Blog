import { api } from "@/services/axios.client"

export const getSearch = async ({ page, limit, search }: { page?: number, limit?: number, search: string }) => {
    const response = await api.get(`/api/search?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}