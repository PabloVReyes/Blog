import { api } from "@/lib"

export const fetchDownloads = async () => {
    const response = await api.get(`/api/downloads/areas`)
    return response.data.data
}
