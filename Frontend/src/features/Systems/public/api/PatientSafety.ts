import { api } from "@/services/axios.client"

export const fetchPatientSafety = async ({ search, categoryId }: { search?: string, categoryId?: string | undefined }) => {
    let url = `/api/systems/codes?`;

    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (categoryId && categoryId !== "all") url += `&categoryId=${categoryId}`;

    const response = await api.get(url);
    return response.data;
}

export const fetchCategoryPatientSafety = async () => {
    const response = await api.get(`/api/systems/codes/categorys`)
    return response.data
}