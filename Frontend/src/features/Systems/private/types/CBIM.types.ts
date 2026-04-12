export interface CBIMData {
    id: string;
    code: string;
    name: string;
    description: string;
    sp: null;
    fpgc: null;
    cbt_cae: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CBIMFilters {
    page?: number;
    limit?: number;
    search?: string;
}
