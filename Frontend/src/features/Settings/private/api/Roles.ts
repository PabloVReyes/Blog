import { createCrudApi } from "@/lib"
import type { RolesFilters, Rol } from "../types/roles.types"

export const settingsRolesApi = createCrudApi<
    Rol,
    Partial<Rol>,
    Partial<Rol>,
    RolesFilters
>("api/roles")

// 23 lineas -> 9 lineas