import { api } from "@/services/axios.client"

export const fetchSystems = async () => {
    const response = await api.get(`/api/systems`)
    return response.data.data
}

export const downloadSystem = async (id: string) => {
    const response = await api.get(`/api/systems/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
