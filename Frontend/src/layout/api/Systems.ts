import { api } from "@/lib/axios.client"

export const fetchSystems = async () => {
    const response = await api.get(`/api/systems`)
    return response.data.data
}

export const downloadSystem = async (id: string | number) => {
    const response = await api.get(`/api/systems/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
