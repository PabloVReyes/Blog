import { api } from "@/lib"

export const fetchCategories = async () => {
    const response = await api.get(`/api/uveh/categories/`)
    return response.data
}

interface Props {
    name: string;
}

export const addCategory = async (body: Props) => {
    const response = await api.post(`/api/uveh/categories`, body)
    return response.data
}