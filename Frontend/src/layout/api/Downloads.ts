import { api } from "@/services"

export const fetchDownloads = async () => {
    const response = await api.get(`/api/downloads/areas`)
    return response.data.data
}
