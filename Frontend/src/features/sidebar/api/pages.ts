import { api } from "@/services/axios.client"

export const getAllPagesUrl = async () => {
    const response = await api.get("/api/pages/urls")
    return response.data
}