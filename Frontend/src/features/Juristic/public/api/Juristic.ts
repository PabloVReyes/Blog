import { api } from "@/services"

export const fetchJuristics = async () => {
    const response = await api.get(`/api/juristics`)
    return response.data
}

export const downloadFile = async (id: string) => {
    const response = await api.get(`/api/juristics/download/${id}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
