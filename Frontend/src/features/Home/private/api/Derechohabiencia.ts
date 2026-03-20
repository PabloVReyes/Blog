import { api } from "@/lib/axios.client"

export const fetchDerechohabiencia = async () => {
    const response = await api.get(`/api/home/derechohabiencia`)
    return response.data
}

export interface Props {
    title: string;
    icon: string;
    color: string;
    description: string;
    links: Link[];
}

export interface Link {
    id: string;
    title: string;
    url: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    derechohabienciaConfigId: string;
}

export const updateDerechohabiencia = async (id: string, body: Props) => {
    const response = await api.put(`/api/home/derechohabiencia/${id}`, body)
    return response.data
}