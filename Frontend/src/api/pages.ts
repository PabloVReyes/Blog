import { api } from "@/services/axios.client"

export const publishPage = async (title: string, content: string, html: string) => {
    const response = await api.post("/api/pages/publish", { title, content, html })
    return response.data
}

export const getPage = async (slug: string) => {
    const response = await api.get(`/api/pages/${slug}`)
    return response.data
}

export const getPages = async () => {
    const response = await api.get(`/api/pages/`)
    return response.data
}