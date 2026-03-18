import { api, buildParams } from "@/lib"

export const fetchRoles = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/roles?${buildParams({ page, limit, search })}`)
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