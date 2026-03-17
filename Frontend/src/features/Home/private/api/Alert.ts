import { api } from "@/lib/axios.client"

export const fetchAlert = async () => {
    const response = await api.get(`/api/home/alert`)
    return response.data
}

export const updateAlert = async (id: string, body: any) => {
    const response = await api.put(`/api/home/alert/${id}`, body)
    return response.data
}