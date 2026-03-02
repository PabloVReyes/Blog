import { api } from "@/services"

export const fetchDownlods = async () => {
    const response = await api.get(`/api/uveh/categories-downloads`)
    return response.data
}

export const downloadFile = async (id: string) => {
    const response = await api.get(`/api/uveh/download/${id}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
