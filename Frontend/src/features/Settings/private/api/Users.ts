import { api, createCrudApi } from "@/lib"
import type { Users, UsersFilters } from "../types/users.types"

export const settingsUsersApi = createCrudApi<
    Users,
    Partial<Users>,
    Partial<Users>,
    UsersFilters
>("api/users")

export const resetPasswordUser = async (id: string) => {
    const response = await api.put(`/api/users/reset-passwd/${id}`)
    return response.data
}

// 35 lineas -> 27 lineas -> 14 lineas