import { api } from "@/services"

export const fectCBIM = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/cbim?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const updateCBIM = async (id: string, body: any) => {
    const response = await api.put(`/api/systems/cbim/${id}`, body)
    return response.data
}

export const addCBIM = async (body: any) => {
    const response = await api.post(`/api/systems/cbim`, body)
    return response.data
}

export const deleteCBIM = async (id: string) => {
    const response = await api.delete(`/api/systems/cbim/${id}`)
    return response.data
}