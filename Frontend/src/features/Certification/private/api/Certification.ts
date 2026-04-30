import { createCrudApi } from "@/lib"
import type { Certification, CertificationFilters } from "../types/certification.types"

export const certificationApi = createCrudApi<
    Certification,
    FormData,
    FormData,
    CertificationFilters
>("api/certification")