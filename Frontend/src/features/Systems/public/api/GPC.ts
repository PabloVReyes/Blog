import { api } from "@/services"

export const fetchGPC = async () => {
    const response = await api.get(`/api/systems/gpc/cicles-algorithms`)
    return response.data
}

export const downloadGPC = async (id: string) => {
    const response = await api.get(`/api/systems/gpc/algorithms/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
