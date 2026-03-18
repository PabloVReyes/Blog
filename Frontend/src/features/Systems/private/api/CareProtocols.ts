import { api, createCrudApi } from "@/lib"
import type { CareProtocols, CareProtocolsFilters } from "../types/careProtocols.types"

export const addCareCategory = async (body: any) => {
    const response = await api.post(`/api/systems/care-protocols/categorys`, body)
    return response.data
}

export const fetchCareCategory = async () => {
    const response = await api.get(`/api/systems/care-protocols/categorys`)
    return response.data
}

export const systemsCareProtocolsApi = createCrudApi<
    CareProtocols,
    FormData,
    FormData,
    CareProtocolsFilters
>("api/systems/care-protocols/protocols")

// 33 lineas -> 19 lineas