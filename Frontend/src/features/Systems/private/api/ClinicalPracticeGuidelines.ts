import { api, createCrudApi } from "@/lib"
import type { ClinicalPracticeGuide, ClinicalPracticeGuideFilters } from "../types/clinicalPracticeGuide.types"

export const fetchCategorys = async () => {
    const response = await api.get(`/api/systems/clinical-practice-guidelines/category`)
    return response.data
}

export const addCategory = async (body: any) => {
    const response = await api.post(`/api/systems/clinical-practice-guidelines/category`, body)
    return response.data
}

export const systemsClinicalPracticeGuidelinesApi = createCrudApi<
    ClinicalPracticeGuide,
    FormData,
    FormData,
    ClinicalPracticeGuideFilters
>("api/systems/clinical-practice-guidelines/guides")

// 32 lineas -> 19 lineas