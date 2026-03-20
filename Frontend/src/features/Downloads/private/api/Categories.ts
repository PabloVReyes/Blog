import { api } from "@/lib"

export const fetchCategories = async (section: number) => {
    const response = await api.get(`/api/downloads/categories/${section}`)
    return response.data
}

export interface Data {
    name: string;
    section: string;
}

export const addCategory = async (body: Data) => {
    const response = await api.post(`/api/downloads/categories`, body)
    return response.data
}