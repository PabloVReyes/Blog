import { api } from "@/lib"

export const changePasswordUser = async (id: string, body: any) => {
    const response = await api.put(`/api/users/change-passwd/${id}`, body)
    return response.data
}

export const updateMe = async (id: string, body: any) => {
    const response = await api.put(`/api/users/me/profile/${id}`, body)
    return response.data
}