import { api } from "@/lib/axios.client"

export const addAccessCard = async (body: any) => {
    const response = await api.post(`/api/home/accesscard`, body)
    return response.data
}

export const fetchAccessCard = async ({ search, page, limit }: { search?: string, page?: number, limit?: number }) => {
    const response = await api.get(`/api/home/accesscard?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const updateAccessCard = async (id: string, body: any) => {
    const response = await api.put(`/api/home/accesscard/${id}`, body)
    return response.data
}

export const deleteAccessCard = async (id: string) => {
    const response = await api.delete(`/api/home/accesscard/${id}`)
    return response.data
}