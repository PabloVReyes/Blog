import { api } from "@/lib/axios.client"

export const fetchAlert = async () => {
    const response = await api.get(`/api/home/alert`)
    return response.data
}

export interface UpdateAlertProps {
    icon:        string;
    isActive:    boolean;
    title:       string;
    description: string;
    author:      string;
    color:       string;
}

export const updateAlert = async (id: string, body: UpdateAlertProps) => {
    const response = await api.put(`/api/home/alert/${id}`, body)
    return response.data
}