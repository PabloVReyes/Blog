import { api } from "@/lib/axios.client"

export const fetchLevels = async () => {
    const response = await api.get(`/api/directory/levels`)
    return response.data
}