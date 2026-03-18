import { api, buildParams } from "@/lib"

export const fetchCBIM = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/cbim?${buildParams({ page, limit, search })}`)
    return response.data
}