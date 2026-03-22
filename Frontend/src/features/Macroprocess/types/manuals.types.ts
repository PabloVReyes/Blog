import type { FileData } from "@/types";

export interface ManualData {
    id: string;
    fileId: null | string;
    areaId: string;
    manualTypeId: string;
    createdAt: Date;
    updatedAt: Date;
    manualType: ManualType;
    file: FileData | null;
}

export interface ManualType {
    id: string;
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}