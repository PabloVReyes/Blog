import type { FileData } from "@/types";

export interface MacroprocessData {
    id: string;
    fileId: null;
    areaId: string;
    manualTypeId: string;
    createdAt: Date;
    updatedAt: Date;
    area: Area;
    manualType: ManualType;
    file: FileData | null;
}

export interface Area {
    id: string;
    name: string;
    category: string;
    manager: null;
    description: null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ManualType {
    id: string;
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}
