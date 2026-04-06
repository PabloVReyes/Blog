import { api } from "@/lib/axios.client"

export const getSettings = async () => {
    const response = await api.get("/api/settings")
    return response.data
}

export const updateSettings = async (name: string, value: string) => {
    const response = await api.put(`/api/settings/`, { name, value })
    return response.data
}

export const uploadFavicon = async (formData: any) => {
    const response = await api.post(`api/settings/upload-favicon`, formData)
    return response.data
}

export const uploadFooter = async (formData: any) => {
    const response = await api.post(`api/settings/upload-footer`, formData)
    return response.data
}