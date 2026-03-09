import { api } from "@/lib"

export const addShift = async (body: any) => {
    const response = await api.post(`/api/vacation/shifts`, body)
    return response.data
}

export const fetchShifts = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/vacation/shifts?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const updateShift = async (id: number, body: any) => {
    const response = await api.put(`/api/vacation/shifts/${id}`, body)
    return response.data
}

export const deleteShift = async (id: number) => {
    const response = await api.delete(`/api/vacation/shifts/${id}`)
    return response.data
}

