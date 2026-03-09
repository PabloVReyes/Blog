import { api } from "@/lib/axios.client"

export const fetchSections = async () => {
    const response = await api.get(`/api/home`)
    return response.data
}