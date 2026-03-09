import { api } from "@/lib"

export const fetchCategories = async () => {
    const response = await api.get(`/api/uveh/categories/`)
    return response.data
}

export const addCategory = async (body: any) => {
    const response = await api.post(`/api/uveh/categories`, body)
    return response.data
}