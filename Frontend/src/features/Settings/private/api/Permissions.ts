import { api } from "@/lib"

export const fecthPermissions = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/permissions?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const addPermission = async (data: any) => {
    const response = await api.post(`/api/permissions`, data)
    return response.data
}

export const updatePermission = async (id: string, data: any) => {
    const response = await api.put(`/api/permissions/${id}`, data)
    return response.data
}

export const deletePermission = async (id: string) => {
    const response = await api.delete(`/api/permissions/${id}`)
    return response.data
}