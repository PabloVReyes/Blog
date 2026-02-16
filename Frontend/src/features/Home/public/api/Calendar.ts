import { api } from "@/services/axios.client"

export const downloadCalendar = async (id: string) => {
    const response = await api.get(`/api/home/calendar/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
