import { api, createCrudApi } from "@/lib"
import type { GPC, GPCFilters } from "../types/GPC.types"

interface AddCycleDto {
    name: string
}

export const addCycle = async (body: AddCycleDto) => {
    const response = await api.post(`/api/systems/gpc/cycles`, body)
    return response.data
}

export const fetchCycle = async () => {
    const response = await api.get(`/api/systems/gpc/cycles`)
    return response.data
}

export const systemsGPCApi = createCrudApi<
    GPC,
    FormData,
    FormData,
    GPCFilters
>("/api/systems/gpc/algorithms")

// 19 lineas