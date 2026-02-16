import { api } from "@/services/axios.client"

export const downloadCarousel = async (id: string) => {
    const response = await api.get(`/api/home/carousel/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
