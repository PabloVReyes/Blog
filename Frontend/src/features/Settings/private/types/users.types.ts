export interface UsersData {
    id: string;
    name: string;
    email: string;
    active: boolean;
    mustChangePassword: boolean;
    lastLoginAt: Date;
    createdAt: Date;
    roles: RoleElement[];
}

export interface RoleElement {
    role: RoleRole;
}

export interface RoleRole {
    id: string;
    name: string;
    description: string;
}

export interface UsersFilters {
    page?: number;
    limit?: number;
    search?: string;
}