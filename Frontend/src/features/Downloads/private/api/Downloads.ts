import { api, buildParams } from "@/lib"

export const addDownload = async (body: any) => {
    const response = await api.post(`/api/downloads/`, body)
    return response.data
}

export const fetchDownloads = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/downloads?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateDownload = async (id: number, body: any) => {
    const response = await api.put(`/api/downloads/${id}`, body)
    return response.data
}

export const deleteDownload = async (id: number) => {
    const response = await api.delete(`/api/downloads/${id}`)
    return response.data
}

// 29 lineas -> 23 lineas