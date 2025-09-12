import { api } from "@/services/axios.client"

export const publishPage = async (title: string, content: {}, html: string) => {
    const response = await api.post("/api/pages/publish", { title, content, html })
    return response.data
}

export const getPage = async (slug: string) => {
    const response = await api.get(`/api/pages/page/${slug}`)
    return response.data
}

export const getPages = async (page: number, limit: number) => {
    const response = await api.get(`/api/pages/?page=${page}&limit=${limit}`)
    return response.data
}

export const getPagesCount = async () => {
    const response = await api.get(`/api/pages/count`)
    console.log(response)
    return response.data
}

export const deletePage = async (id: string) => {
    const response = await api.delete(`/api/pages/delete/${id}`)
    return response.data;
}