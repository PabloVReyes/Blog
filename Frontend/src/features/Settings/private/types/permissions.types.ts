export interface Permission {
    id: string;
    name: string;
    key: string;
    description: string;
    active: boolean;
    _count: Count;
    roles: RoleElement[];
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