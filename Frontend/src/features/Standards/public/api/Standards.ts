import { api } from "@/lib"

export const fetchStandards = async () => {
    const response = await api.get(`/api/standards`)
    return response.data
}

export const downloadFile = async (id: string) => {
    const response = await api.get(`/api/standards/download/${id}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
