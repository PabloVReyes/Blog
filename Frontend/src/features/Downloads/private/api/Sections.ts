import { api } from "@/lib"

export const fetchSections = async (area: string | number) => {
    const response = await api.get(`/api/downloads/sections/${area}`)
    return response.data
}

interface Props {
    name: string;
    area: string;
}

export const addSections = async (body: Props) => {
    const response = await api.post(`/api/downloads/sections`, body)
    return response.data
}