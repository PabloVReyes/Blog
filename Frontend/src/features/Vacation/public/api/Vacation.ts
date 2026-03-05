import { api } from "@/services"

export const fetchVacations = async () => {
    const response = await api.get(`/api/vacation/shifts-vacations`)
    return response.data
}

export const downloadFile = async (id: string) => {
    const response = await api.get(`/api/vacation/download/${id}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
