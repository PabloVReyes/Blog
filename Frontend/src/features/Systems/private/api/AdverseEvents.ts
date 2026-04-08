import { api } from "@/lib"

export const fetchAdverseEvents = async () => {
    const response = await api.get(`/api/systems/adverse-events`)
    return response.data
}

export const updateAdverseEvent = async (id: string, body: FormData) => {
    const response = await api.put(`/api/systems/adverse-events/${id}`, body)
    return response.data
}

export const deleteAdverseEvent = async (id: string) => {
    const response = await api.delete(`/api/systems/adverse-events/${id}`)
    return response.data
}