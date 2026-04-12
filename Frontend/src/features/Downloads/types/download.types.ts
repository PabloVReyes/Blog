import type { FileData } from "@/types";

export interface DownloadData {
    id: string;
    name: string;
    description: string;
    fileId: string;
    type: string;
    isNew: boolean;
    isActive: boolean;
    order: null;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    file: FileData | null;
    category: Category;
}

export interface Category {
    id: string;
    name: string;
    order: null;
    isActive: boolean;
    sectionId?: string;
    createdAt: Date;
    updatedAt: Date;
    section?: Category;
    areaId?: string;
    area?: Area;
}

export interface Area {
    id: string;
    name: string;
    slug: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface File {
    id: string;
    name: string;
    path: string;
    size: number;
    mimeType: string;
    url: null;
    provider: null;
    createdAt: Date;
}
