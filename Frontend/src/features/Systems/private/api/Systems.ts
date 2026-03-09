import { api } from "@/lib/axios.client"
import type { SystemProps } from "../../types"

export const addSystem = async (body: SystemProps) => {
    const response = await api.post(`/api/systems`, body)
    return response.data
}

export const fetchSystems = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const updateSystem = async (id: string, body: SystemProps) => {
    const response = await api.put(`/api/systems/${id}`, body)
    return response.data
}


export const deleteSystem = async (id: string) => {
    const response = await api.delete(`/api/systems/${id}`)
    return response.data
}