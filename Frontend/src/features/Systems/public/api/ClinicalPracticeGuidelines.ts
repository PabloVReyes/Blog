import { api, buildParams } from "@/lib"

export const fetchCategorys = async () => {
    const response = await api.get(`/api/systems/clinical-practice-guidelines/category`)
    return response.data
}

export const fetchGuides = async ({ page, limit, search, categoryId }: { page?: number, limit?: number, search?: string, categoryId?: string }) => {
    const response = await api.get(`/api/systems/clinical-practice-guidelines/guides?${buildParams({ page, limit, search, categoryId })}`)
    return response.data
}
