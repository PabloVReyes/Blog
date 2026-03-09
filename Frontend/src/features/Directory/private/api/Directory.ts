import { api } from "@/lib/axios.client"

interface Props {
    page: number;
    limit: number;
    search: string;
}

export const fetchDirectory = async ({ page, limit, search }: Props) => {
    const response = await api.get(`/api/directory?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const addDirectory = async (body: any) => {
    const response = await api.post(`/api/directory`, body)
    return response.data
}

export const updateDirectory = async (id: string, body: any) => {
    const response = await api.put(`/api/directory/${id}`, body)
    return response.data
}

export const deleteDirectory = async (id: string) => {
    const response = await api.delete(`/api/directory/${id}`)
    return response.data
}