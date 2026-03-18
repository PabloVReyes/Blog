export interface Shift {
    id: number;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ShiftFilters {
    page?: number;
    limit?: number;
    search?: string;
}
