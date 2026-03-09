import { api } from "@/lib"

export const fetchPBM = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    let url = `/api/systems/pbm?page=${page}&limit=${limit}`
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const response = await api.get(url)
    return response.data
}

export const downloadPBM = async (id: string) => {
    const response = await api.get(`/api/systems/pbm/${id}/download`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}
