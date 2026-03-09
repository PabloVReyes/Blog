import { api } from "@/lib"

export const addJuristic = async (body: any) => {
    const response = await api.post(`/api/juristics/`, body)
    return response.data
}

export const fetchJuristics = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/juristics?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const updateJuristic = async (id: number, body: any) => {
    const response = await api.put(`/api/juristics/${id}`, body)
    return response.data
}

export const deleteJuristic = async (id: number) => {
    const response = await api.delete(`/api/juristics/${id}`)
    return response.data
}

