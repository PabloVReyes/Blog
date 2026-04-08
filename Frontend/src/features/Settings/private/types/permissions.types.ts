export interface PermissionData {
    id: string;
    name: string;
    key: string;
    description: string;
    isActive: boolean;
    _count: Count;
    roles: RoleElement[];
    permissionKey: string;
}

export interface Count {
    roles: number;
}

export interface RoleElement {
    role: RoleRole;
}

export interface RoleRole {
    id: string;
    name: string;
    description: string;
}

export interface PermissionFilters {
    page?: number;
    limit?: number;
    search?: string;
}