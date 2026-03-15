import { api } from "@/lib"

export const addStandar = async (body: any) => {
    const response = await api.post(`/api/standards/`, body)
    return response.data
}

export const fetchStandards = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/standards?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const updateStandard = async (id: number, body: any) => {
    const response = await api.put(`/api/standards/${id}`, body)
    return response.data
}

export const deleteStandard = async (id: number) => {
    const response = await api.delete(`/api/standards/${id}`)
    return response.data
}

