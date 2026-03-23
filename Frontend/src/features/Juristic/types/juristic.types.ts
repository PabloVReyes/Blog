import type { FileData } from "@/types";

export interface JuristicData {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileId: string;
    createdAt: Date;
    updatedAt: Date;
    file: FileData | null;
}

export interface JuristicFilter {
    page?: number;
    limit?: number;
    search?: string;
}