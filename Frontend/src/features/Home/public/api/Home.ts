import { api } from "@/services/axios.client"

export const fecthHomeSections = async () => {
    const response = await api.get(`/api/home`)
    return response.data
}
