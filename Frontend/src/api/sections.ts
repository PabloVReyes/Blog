import { api } from "@/services/axios.client"

export const getSections = async () => {
    const response = await api.get("/api/sections")
    return response.data
}

export const updateSection = async (id: number, values: any) => {
    const response = await api.put(`/api/sections/${id}`, values)
    return response.data
}