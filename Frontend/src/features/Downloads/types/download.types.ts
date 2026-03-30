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
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    file: FileData | null;
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