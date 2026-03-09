import { api } from "@/lib"

export const fetchCategorys = async () => {
    const response = await api.get(`/api/systems/clinical-practice-guidelines/category`)
    return response.data
}

export const addCategory = async (body: any) => {
    const response = await api.post(`/api/systems/clinical-practice-guidelines/category`, body)
    return response.data
}

export const fetchGuides = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/clinical-practice-guidelines/guides?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const addGuide = async (body: any) => {
    const response = await api.post(`/api/systems/clinical-practice-guidelines/guides`, body)
    return response.data
}

export const updateGuide = async (id: string, body: any) => {
    const response = await api.put(`/api/systems/clinical-practice-guidelines/guides/${id}`, body)
    return response.data
}

export const deleteGuide = async (id: string) => {
    const response = await api.delete(`/api/systems/clinical-practice-guidelines/guides/${id}`)
    return response.data
}