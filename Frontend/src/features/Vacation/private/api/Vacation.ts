import { api } from "@/services"

export const addVacation = async (body: any) => {
    const response = await api.post(`/api/vacation`, body)
    return response.data
}

export const fetchVacations = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/vacation?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const updateVacation = async (id: number, body: any) => {
    const response = await api.put(`/api/vacation/${id}`, body)
    return response.data
}

export const deleteVacation = async (id: number) => {
    const response = await api.delete(`/api/vacation/${id}`)
    return response.data
}

