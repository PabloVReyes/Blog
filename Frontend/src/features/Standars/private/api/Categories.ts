import { api } from "@/services"

export const fetchCategories = async () => {
    const response = await api.get(`/api/standars/categories/`)
    return response.data
}

export const addCategory = async (body: any) => {
    const response = await api.post(`/api/standars/categories`, body)
    return response.data
}