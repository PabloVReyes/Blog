import { api } from "@/lib"

export const addCertification = async (body: any) => {
    const response = await api.post(`/api/certification/`, body)
    return response.data
}

export const fetchCertifications = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/certification?${params.toString()}`

    const response = await api.get(url)
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

