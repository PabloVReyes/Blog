import { api } from "@/services/axios.client"

export const getSettings = async() => {
    const response = await api.get("/api/settings")
    return response.data
}