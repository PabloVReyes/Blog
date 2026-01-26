import { api } from "@/services/axios.client"

interface Props {
    page: number;
    limit: number;
    search: string;
}

export const getDirectory = async ({ page, limit, search }: Props) => {
    const response = await api.get(`/api/directory?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}