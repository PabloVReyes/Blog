import { api } from "@/lib"

interface ChangePasswordUserProps {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const changePasswordUser = async (id: string, body: ChangePasswordUserProps) => {
    const response = await api.put(`/api/users/me/change-passwd/${id}`, body)
    return response.data
}

interface UpdateMeProps {
    email: string;
    password: string
}

export const updateMe = async (id: string, body: UpdateMeProps) => {
    const response = await api.put(`/api/users/me/profile/${id}`, body)
    return response.data
}