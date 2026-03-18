import { api, buildParams } from "@/lib"

export const addCertification = async (body: any) => {
    const response = await api.post(`/api/certification/`, body)
    return response.data
}

export const fetchCertifications = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/certification?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateCertification = async (id: number, body: any) => {
    const response = await api.put(`/api/certification/${id}`, body)
    return response.data
}

export const deleteCertification = async (id: number) => {
    const response = await api.delete(`/api/certification/${id}`)
    return response.data
}

