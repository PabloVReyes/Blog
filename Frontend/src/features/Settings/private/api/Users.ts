import { api } from "@/lib"

export const fecthUsers = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams()

    if (page) params.append("page", String(page))
    if (limit) params.append("limit", String(limit))
    if (search) params.append("search", search)

    const url = `/api/users?${params.toString()}`

    const response = await api.get(url)
    return response.data
}