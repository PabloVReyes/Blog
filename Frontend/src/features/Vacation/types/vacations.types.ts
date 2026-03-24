import type { FileData } from "@/types";

export interface VacationsData {
    id: number;
    fileId: string;
    type: string;
    shiftId: number;
    createdAt: Date;
    shift: ShiftData;
    file: FileData | null;
}

export interface ShiftData {
    id: number;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    files: FileElement[];
}

export interface FileElement {
    id: number;
    fileId: string;
    type: string;
    shiftId: number;
    createdAt: Date;
    file: FileData;
}