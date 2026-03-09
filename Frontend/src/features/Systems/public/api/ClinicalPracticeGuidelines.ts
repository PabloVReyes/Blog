import { api } from "@/lib"

export const fetchCategorys = async () => {
    const response = await api.get(`/api/systems/clinical-practice-guidelines/category`)
    return response.data
}

export const fetchGuides = async ({ page, limit, search, categoryId }: { page?: number, limit?: number, search?: string, categoryId?: string }) => {
    let url = `/api/systems/clinical-practice-guidelines/guides?page=${page ?? 1}&limit=${limit ?? 10}`
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (categoryId && categoryId !== "all") url += `&categoryId=${categoryId}`;
    const response = await api.get(url)
    return response.data
}

export const downloadGuide = async (id: string, type: string) => {
    const response = await api.get(`/api/systems/clinical-practice-guidelines/guides/${id}/download/${type}`, {
        responseType: "blob" // 👈 CLAVE
    })
    return response
}