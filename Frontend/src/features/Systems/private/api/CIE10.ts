import { api } from "@/services/axios.client"

export const fecthCIE10 = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/cie-10?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const addCIE10 = async (body: any) => {
    const response = await api.post(`/api/systems/cie-10`, body)
    return response.data
}

export const updateCIE10 = async (id: string, body: any) => {
    const response = await api.put(`/api/systems/cie-10/${id}`, body)
    return response.data
}

export const deleteCIE10 = async (id: string) => {
    const response = await api.delete(`/api/systems/cie-10/${id}`)
    return response.data
}

