import { api } from "@/lib"

export const fetchGPC = async () => {
    const response = await api.get(`/api/systems/gpc/cycles-algorithms`)
    return response.data
}