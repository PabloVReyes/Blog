import { api } from "@/lib"

export const fetchSections = async () => {
    const response = await api.get(`/api/certification/sections/`)
    return response.data
}

interface Props {
    name: string
}

export const addSection = async (body: Props) => {
    const response = await api.post(`/api/certification/sections`, body)
    return response.data
}