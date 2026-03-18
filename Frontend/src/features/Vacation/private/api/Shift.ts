import { api, buildParams } from "@/lib"

export const addShift = async (body: any) => {
    const response = await api.post(`/api/vacation/shifts`, body)
    return response.data
}

export const fetchShifts = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/vacation/shifts?${buildParams({ page, limit, search })}`)
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

