import { api } from "@/services/axios.client"

export const getFiles = async(page: number, limit: number, search: string) => {
    const response = await api.get(`/api/files?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const getFilesCount = async(search: string) => {
    const response = await api.get(`/api/files/count?search=${search}`)
    return response.data
}

export const deleteFile = async(filename: string) => {
    const response = await api.delete(`/api/files/${filename}`)
    return response.data
}