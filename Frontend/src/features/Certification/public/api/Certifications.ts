import { api } from "@/lib"

export const fetchCertifications = async () => {
    const response = await api.get(`/api/certification/sections-certifications`)
    return response.data
}