export interface Juristic {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface JusristicFilters {
    page?: number;
    limit?: number;
    search?: string
}