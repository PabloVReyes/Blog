import { api } from "@/lib/axios.client"

export const fetchAreas = async () => {
    const response = await api.get(`/api/downloads/areas`)
    return response.data
}

export const fecthArea = async (slug?: string) => {
    const response = await api.get(`/api/downloads/areas/${slug}`)
    return response.data
}