import { api } from "@/services"

export const addStandar = async (body: any) => {
    const response = await api.post(`/api/standars/`, body)
    return response.data
}

export const fetchStandars = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/standars?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const updateStandar = async (id: number, body: any) => {
    const response = await api.put(`/api/standars/${id}`, body)
    return response.data
}

export const deleteStandar = async (id: number) => {
    const response = await api.delete(`/api/standars/${id}`)
    return response.data
}

