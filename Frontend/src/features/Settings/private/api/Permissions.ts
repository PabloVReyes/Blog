import { api, buildParams } from "@/lib"

export const fetchPermissions = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/permissions?${buildParams({ page, limit, search })}`)
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

// 29 lineas -> 21 lineas