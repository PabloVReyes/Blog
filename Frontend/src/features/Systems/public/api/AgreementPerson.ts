import { api } from "@/services/axios.client"

export const fetchAgreementPerson = async ({ page, limit, search, groupId, zoneId }: { page?: number, limit?: number, search?: string, groupId?: string | undefined, zoneId?: string | undefined }) => {
    let url = `/api/systems/agreement-person/persons-dependents?page=${page ?? 1}&limit=${limit ?? 10}`;

    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (groupId && groupId !== "all") url += `&groupId=${groupId}`;
    if (zoneId && zoneId !== "all") url += `&zoneId=${zoneId}`;

    const response = await api.get(url);
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