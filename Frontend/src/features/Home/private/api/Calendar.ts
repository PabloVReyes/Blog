import { api } from "@/lib/axios.client"

export const fetchCalendar = async () => {
    const response = await api.get(`/api/home/calendar`)
    return response.data
}

export const updateCalendar = async (id: string, body: FormData) => {
    const response = await api.put(`/api/home/calendar/${id}`, body)
    return response.data
}