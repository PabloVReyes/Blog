import { api } from "@/services/axios.client"

export const getAllCarousel = async (page: number, limit: number) => {
    const response = await api.get(`/api/carousel/all?page=${page}&limit=${limit}`)
    return response.data
}

export const getAllCarouselCount = async () => {
    const response = await api.get("/api/carousel/all/count")
    return response.data
}

export const getCarousel = async () => {
    const response = await api.get('/api/carousel')
    return response.data
}

export const addCarousel = async (values: any) => {
    const response = await api.post('/api/carousel', values)
    return response.data
}

export const updateCarousel = async (id: string, values: any) => {
    const response = await api.put(`/api/carousel/${id}`, values, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export const deleteCarousel = async (id: string) => {
    const response = await api.delete(`/api/carousel/${id}`)
    return response.data
}