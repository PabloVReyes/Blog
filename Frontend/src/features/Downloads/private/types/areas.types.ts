export interface Area {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface AreaFilters {
    page?: number
    limit?: number
    search?: string
}