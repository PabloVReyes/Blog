import { api } from "@/lib"

export const fetchStandars = async () => {
    const response = await api.get(`/api/standars`)
    return response.data
}

export const downloadFile = async (id: string) => {
    const response = await api.get(`/api/standars/download/${id}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
