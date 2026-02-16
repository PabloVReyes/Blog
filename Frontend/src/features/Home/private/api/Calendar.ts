import { api } from "@/services/axios.client"

export const fecthCalendar = async () => {
    const response = await api.get(`/api/home/calendar`)
    return response.data
}

export const updateCalendar = async (id: string, body: any) => {
    const response = await api.put(`/api/home/calendar/${id}`, body)
    return response.data
}