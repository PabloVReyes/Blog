import { api } from "@/lib"

export const addCareCategory = async (body: any) => {
    const response = await api.post(`/api/systems/care-protocols/categorys`, body)
    return response.data
}

export const fetchCareCategory = async () => {
    const response = await api.get(`/api/systems/care-protocols/categorys`)
    return response.data
}

export const addCareProtocols = async (body: any) => {
    const response = await api.post(`/api/systems/care-protocols/protocols`, body)
    return response.data
}

export const fetchCareProtocols = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/care-protocols/protocols?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const updateCareProtocols = async (id: string, body: any) => {
    const response = await api.put(`/api/systems/care-protocols/protocols/${id}`, body)
    return response.data
}

export const deleteCareProtocols = async (id: string) => {
    const response = await api.delete(`/api/systems/care-protocols/protocols/${id}`)
    return response.data
}

