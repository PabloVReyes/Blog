import { api } from "@/lib/axios.client"

export const addCarousel = async (body: any) => {
    const response = await api.post(`/api/home/carousel`, body)
    return response.data
}

export const fetchCarousel = async ({ search, page, limit }: { search?: string, page?: number, limit?: number }) => {
    const response = await api.get(`/api/home/carousel?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const updateCarousel = async (id: string, body: any) => {
    const response = await api.put(`/api/home/carousel/${id}`, body)
    return response.data
}

export const deleteCarousel = async (id: string) => {
    const response = await api.delete(`/api/home/carousel/${id}`)
    return response.data
}
