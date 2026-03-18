import { api, buildParams } from "@/lib"

export const fetchAgreementPerson = async ({ page, limit, search }: { page?: number, limit?: number, search?: string }) => {
    const response = await api.get(`/api/systems/agreement-person?${buildParams({ page, limit, search })}`)
    return response.data
}

export const addAgreementPerson = async (body: any) => {
    const response = await api.post(`/api/systems/agreement-person`, body)
    return response.data
}

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

export const addGroup = async (body: any) => {
    const response = await api.post(`/api/systems/agreement-person/groups`, body)
    return response.data
}

export const addZone = async (body: any) => {
    const response = await api.post(`/api/systems/agreement-person/zones`, body)
    return response.data
}

export const updateAgreementPerson = async (id: number, body: any) => {
    const response = await api.put(`/api/systems/agreement-person/${id}`, body)
    return response.data
}

export const deleteAgreementPerson = async (id: number) => {
    const response = await api.delete(`/api/systems/agreement-person/${id}`)
    return response.data
}
