import { api, buildParams, createCrudApi } from "@/lib"
import type { AgreementPerson, AgreementPersonFilters } from "../types/agreementPerson.types"

export const systemsAgreementPersonApi = createCrudApi<
    AgreementPerson,
    Partial<AgreementPerson>,
    Partial<AgreementPerson>,
    AgreementPersonFilters
>("api/systems/agreement-person")

export const fetchAgreementPersonHolders = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/agreement-person/persons-dependents?${buildParams({ page, limit, search })}`)
    return response.data
}

export const fetchGroups = async () => {
    const response = await api.get(`/api/systems/agreement-person/groups`)
    return response.data
}

export const fetchZones = async () => {
    const response = await api.get(`/api/systems/agreement-person/zones`)
    return response.data
}

interface AddGroupProps {
    name: string
}

export const addGroup = async (body: AddGroupProps) => {
    const response = await api.post(`/api/systems/agreement-person/groups`, body)
    return response.data
}

interface AddZoneProps {
    name: string
}

export const addZone = async (body: AddZoneProps) => {
    const response = await api.post(`/api/systems/agreement-person/zones`, body)
    return response.data
}

// 48 lineas -> 42 lineas