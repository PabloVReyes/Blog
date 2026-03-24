import { api } from "@/lib"

export const fetchVacations = async () => {
    const response = await api.get(`/api/vacation/shifts-vacations`)
    return response.data
}