import { buildParams } from "@/lib";
import { api } from "@/lib/axios.client"

export const fetchAgreementPerson = async ({ page, limit, search, groupId, zoneId }: { page?: number, limit?: number, search?: string, groupId?: string | undefined, zoneId?: string | undefined }) => {
    const response = await api.get(`/api/systems/agreement-person/persons-dependents?${buildParams({ page, limit, search, groupId, zoneId })}`);
    return response.data;
}


export const fetchGroups = async () => {
    const response = await api.get(`/api/systems/agreement-person/groups`)
    return response.data
}

export const fetchZones = async () => {
    const response = await api.get(`/api/systems/agreement-person/zones`)
    return response.data
}

// 23 lineas -> 18 lineas