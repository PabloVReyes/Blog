import type { FileData } from "@/types";

export interface StandardsData {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileId: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    file: FileData | null;
}

export interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
