import { api } from "@/services/axios.client"

export const publishPage = async (values: any) => {
    const response = await api.post("/api/pages/publish", values)
    return response.data
}

export const getPage = async (slug: string) => {
    const response = await api.get(`/api/pages/page/${slug}`)
    return response.data
}

export const getPages = async (page: number, limit: number, search: string) => {
    const response = await api.get(`/api/pages/?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const getPagesCount = async (search: string) => {
    const response = await api.get(`/api/pages/count?search=${search}`)
    return response.data
}

export const deletePage = async (id: string) => {
    const response = await api.delete(`/api/pages/delete/${id}`)
    return response.data;
}

export const getAllPages = async () => {
    const response = await api.get("/api/pages/all")
    return response.data
}

export const uploadPageImage = async (file: any) => {
    const response = await api.post("/api/pages/image", file)
    return response.data
}