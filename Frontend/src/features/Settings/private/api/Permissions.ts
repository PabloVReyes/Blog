import { createCrudApi } from "@/lib"
import type { Permission, PermissionFilters } from "../types/permissions.types"

export const settingsPermissionsApi = createCrudApi<
    Permission,
    Partial<Permission>,
    Partial<Permission>,
    PermissionFilters
>("api/permissions")

// 29 lineas -> 21 lineas -> 9 lineas