import { api } from "@/lib/axios.client"

export const downloadAccessCard = async (id: string) => {
    const response = await api.get(`/api/home/accesscard/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
