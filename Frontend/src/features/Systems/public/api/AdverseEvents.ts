import { api } from "@/lib"

export const downloadAdverseEvent = async (type: string) => {
    const response = await api.get(`/api/systems/adverse-events/${type}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}

