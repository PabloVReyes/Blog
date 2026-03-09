import { api } from "@/lib"

export const fetchCertifications = async () => {
    const response = await api.get(`/api/certification/sections-certifications`)
    return response.data
}

export const downloadFile = async (id: string) => {
    const response = await api.get(`/api/certification/download/${id}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
