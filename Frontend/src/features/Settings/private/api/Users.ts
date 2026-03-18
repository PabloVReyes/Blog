import { api, buildParams } from "@/lib"

export const fetchUsers = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/users?${buildParams({ page, limit, search })}`)
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

// 35 lineas -> 27 lineas