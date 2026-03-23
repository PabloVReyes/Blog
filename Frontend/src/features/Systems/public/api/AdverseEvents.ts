import { api } from "@/lib"

export const fetchAdverseEvent = async () => {
    const response = await api.get(`/api/systems/adverse-events`)
    return response.data
}

