import { api, buildParams } from "@/lib"

export const addJuristic = async (body: any) => {
    const response = await api.post(`/api/juristics/`, body)
    return response.data
}

export const fetchJuristics = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/juristics?${buildParams({ page, limit, search })}`)
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

// 29 lineas -> 21 lineas