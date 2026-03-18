import { api, buildParams } from "@/lib"

export const addPBM = async (body: any) => {
    const response = await api.post(`/api/systems/pbm`, body)
    return response.data
}

export const fetchPBM = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/pbm?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updatePBM = async (id: string, body: any) => {
    const response = await api.put(`/api/systems/pbm/${id}`, body)
    return response.data
}

export const deletePBM = async (id: string) => {
    const response = await api.delete(`/api/systems/pbm/${id}`)
    return response.data
}