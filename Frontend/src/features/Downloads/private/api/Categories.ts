import { api } from "@/services"

export const fetchCategories = async (section: number) => {
    const response = await api.get(`/api/downloads/categories/${section}`)
    return response.data
}

export const addCategory = async (body: any) => {
    const response = await api.post(`/api/downloads/categories`, body)
    return response.data
}