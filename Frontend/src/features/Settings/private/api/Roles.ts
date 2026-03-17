import { api } from "@/lib"

export const fetchRoles = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/roles?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const addRole = async (data: any) => {
    const response = await api.post(`/api/roles`, data)
    return response.data
}

export const updateRoles = async (id: string, data: any) => {
    const response = await api.put(`/api/roles/${id}`, data)
    return response.data
}

export const deleteRole = async (id: string) => {
    const response = await api.delete(`/api/roles/${id}`)
    return response.data
}