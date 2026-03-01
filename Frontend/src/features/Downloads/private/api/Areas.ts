import { api } from "@/services/axios.client"

export const addArea = async (body: any) => {
    const response = await api.post(`/api/downloads/areas`, body)
    return response.data
}

export const fetchAreas = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/downloads/areas?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const updateArea = async (id: string, body: any) => {
    const response = await api.put(`/api/downloads/areas/${id}`, body)
    return response.data
}

export const deleteArea = async (id: number) => {
    const response = await api.delete(`/api/downloads/areas/${id}`)
    return response.data
}