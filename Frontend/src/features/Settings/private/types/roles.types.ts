export interface RolData {
    id: string;
    name: string;
    description: string;
    _count: Count;
    permissions: PermissionElement[];
}

export interface Count {
    users: number;
    permissions: number;
}

export interface PermissionElement {
    permission: PermissionPermission;
}

export interface PermissionPermission {
    id: string;
    name: string;
    key: string;
    description: string;
    active: boolean;
}

export interface RolesFilters {
    page?: number;
    limit?: number;
    search?: string;
}