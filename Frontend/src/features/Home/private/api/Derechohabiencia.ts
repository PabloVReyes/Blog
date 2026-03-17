import { api } from "@/lib/axios.client"

export const fetchDerechohabiencia = async () => {
    const response = await api.get(`/api/home/derechohabiencia`)
    return response.data
}

export const updateDerechohabiencia = async (id: string, body: any) => {
    const response = await api.put(`/api/home/derechohabiencia/${id}`, body)
    return response.data
}