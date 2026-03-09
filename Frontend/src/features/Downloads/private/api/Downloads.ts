import { api } from "@/lib"

export const addDownload = async (body: any) => {
    const response = await api.post(`/api/downloads/`, body)
    return response.data
}

export const fetchDownloads = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/downloads?${params.toString()}`

    const response = await api.get(url)
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

