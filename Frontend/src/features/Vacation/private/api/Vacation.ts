import { api, buildParams } from "@/lib"

export const addVacation = async (body: any) => {
    const response = await api.post(`/api/vacation`, body)
    return response.data
}

export const fetchVacations = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/vacation?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateVacation = async (id: number, body: any) => {
    const response = await api.put(`/api/vacation/${id}`, body)
    return response.data
}

export const deleteVacation = async (id: number) => {
    const response = await api.delete(`/api/vacation/${id}`)
    return response.data
}

