import { api } from "@/services/axios.client"

export const getAreaById = async (id: string) => {
    const response = await api.get(`/api/macroprocess/${id}`)
    return response.data
}

export const downloadManual = async (id: string) => {
    const response = await api.get(`/api/macroprocess/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}

export const getManual = async (type: string) => {
    const response = await api.get(`/api/macroprocess/manuals/${type}`)
    return response.data
}