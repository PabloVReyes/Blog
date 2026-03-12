import { api } from "@/lib"

export const fecthUsers = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/users?${params.toString()}`

    const response = await api.get(url)
    return response.data
}

export const addUser = async (data: any) => {
    const response = await api.post(`/api/users`, data)
    return response.data
}

export const updateUser = async (id: string, data: any) => {
    const response = await api.put(`/api/users/${id}`, data)
    return response.data
}


export const resetPasswordUser = async (id: string) => {
    const response = await api.put(`/api/users/reset-passwd/${id}`)
    return response.data
}

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/api/users/${id}`)
    return response.data
}