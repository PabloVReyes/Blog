import { api } from "@/services/axios.client"

export const fetchSystems = async () => {
    const response = await api.get(`/api/systems`)
    return response.data
}