import { api } from "@/lib"

export const fetchCategories = async () => {
    const response = await api.get(`/api/standards/categories/`)
    return response.data
}

interface AddCategoryDto {
    name: string
}

export const addCategory = async (body: AddCategoryDto) => {
    const response = await api.post(`/api/standards/categories`, body)
    return response.data
}