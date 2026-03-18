export interface Download {
    id: number;
    name: string;
    description: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    type: string;
    isNew: boolean;
    isActive: boolean;
    order: null;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    order: null;
    isActive: boolean;
    sectionId?: number;
    createdAt: Date;
    updatedAt: Date;
    section?: Category;
    areaId?: number;
    area?: Area;
}

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

export interface DownloadFilters {
    page?: number;
    limit?: number;
    search?: string;
}