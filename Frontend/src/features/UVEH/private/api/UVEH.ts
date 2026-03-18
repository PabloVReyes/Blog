import { api, buildParams } from "@/lib"

export const addDownload = async (body: any) => {
    const response = await api.post(`/api/uveh/`, body)
    return response.data
}

export const fetchDownloads = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/uveh?${buildParams({ page, limit, search })}`)
    return response.data
}

export const updateDownload = async (id: number, body: any) => {
    const response = await api.put(`/api/uveh/${id}`, body)
    return response.data
}

export const deleteDownload = async (id: number) => {
    const response = await api.delete(`/api/uveh/${id}`)
    return response.data
}

