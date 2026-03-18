import { buildParams } from "@/lib";
import { api } from "@/lib/axios.client"

export const fetchPatientSafety = async ({ search, categoryId }: { search?: string, categoryId?: string | undefined }) => {
    const response = await api.get(`/api/systems/codes?${buildParams({ search, categoryId })}`);
    return response.data;
}

export const fetchCategoryPatientSafety = async () => {
    const response = await api.get(`/api/systems/codes/categorys`)
    return response.data
}