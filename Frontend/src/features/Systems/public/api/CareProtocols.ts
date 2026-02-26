import { api } from "@/services"

export const fetchCareCategory = async () => {
    const response = await api.get(`/api/systems/care-protocols/categorys-protocols`)
    return response.data
}

export const downloadProtocol = async (id: string) => {
    const response = await api.get(`/api/systems/care-protocols/protocols/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}

