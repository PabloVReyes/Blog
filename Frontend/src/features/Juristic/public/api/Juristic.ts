import { api } from "@/lib"

export const fetchJuristics = async () => {
    const response = await api.get(`/api/juristics`)
    return response.data
}