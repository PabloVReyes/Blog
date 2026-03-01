import { api } from "@/services"

export const downloadFile = async (id: string) => {
    const response = await api.get(`/api/downloads/download/${id}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
