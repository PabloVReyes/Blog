import { createCrudApi } from "@/lib"
import type { PermissionData, PermissionFilters } from "../types/permissions.types"

export const settingsPermissionsApi = createCrudApi<
    PermissionData,
    Partial<PermissionData>,
    Partial<PermissionData>,
    PermissionFilters
>("api/permissions")

// 29 lineas -> 21 lineas -> 9 lineas