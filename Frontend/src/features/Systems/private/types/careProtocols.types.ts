export interface CareProtocols {
    id: string;
    title: string;
    description: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    categoryCareProtocolsId: string;
    category: Category;
}

export interface Category {
    id: string;
    name: string;
}

export interface CareProtocolsFilters {
    page?: number;
    limit?: number;
    search?: string;
}