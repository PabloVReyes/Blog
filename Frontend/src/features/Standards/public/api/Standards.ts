import { api } from "@/lib"

export const fetchStandards = async () => {
    const response = await api.get(`/api/standards`)
    return response.data
}

