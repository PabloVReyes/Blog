import { api, buildParams } from "@/lib"

export const fetchPBM = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/pbm?${buildParams({ page, limit, search })}`)
    return response.data
}
