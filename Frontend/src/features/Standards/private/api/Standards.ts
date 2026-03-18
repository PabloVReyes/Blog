import { api, buildParams } from "@/lib"

export const addStandar = async (body: any) => {
    const response = await api.post(`/api/standards/`, body)
    return response.data
}

export const fetchStandards = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/standards?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateStandard = async (id: number, body: any) => {
    const response = await api.put(`/api/standards/${id}`, body)
    return response.data
}

export const deleteStandard = async (id: number) => {
    const response = await api.delete(`/api/standards/${id}`)
    return response.data
}

// 29 lineas -> 21 lineas
