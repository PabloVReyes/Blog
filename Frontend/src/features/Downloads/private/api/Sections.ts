import { api } from "@/lib"

export const fetchSections = async (area: number) => {
    const response = await api.get(`/api/downloads/sections/${area}`)
    return response.data
}

export const addSections = async (body: any) => {
    const response = await api.post(`/api/downloads/sections`, body)
    return response.data
}