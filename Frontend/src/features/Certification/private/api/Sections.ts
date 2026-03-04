import { api } from "@/services"

export const fetchSections = async () => {
    const response = await api.get(`/api/certification/sections/`)
    return response.data
}

export const addSection = async (body: any) => {
    const response = await api.post(`/api/certification/sections`, body)
    return response.data
}