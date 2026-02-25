import { api } from "@/services"

export const addCicle = async (body: any) => {
    const response = await api.post(`/api/systems/gpc/cicles`, body)
    return response.data
}

export const fetchCicle = async () => {
    const response = await api.get(`/api/systems/gpc/cicles`)
    return response.data
}

export const addGPC = async (body: any) => {
    const response = await api.post(`/api/systems/gpc/algorithms`, body)
    return response.data
}

export const fetchGPC = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/gpc/algorithms?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const updateGPC = async (id: string, body: any) => {
    const response = await api.put(`/api/systems/gpc/algorithms/${id}`, body)
    return response.data
}

export const deleteGPC = async (id: string) => {
    const response = await api.delete(`/api/systems/gpc/algorithms/${id}`)
    return response.data
}

