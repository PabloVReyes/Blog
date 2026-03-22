import { api } from "@/lib/axios.client"

export const getAreaById = async (id: string) => {
    const response = await api.get(`/api/macroprocess/${id}`)
    return response.data
}

export const getManual = async (type: string) => {
    const response = await api.get(`/api/macroprocess/manuals/${type}`)
    return response.data
}