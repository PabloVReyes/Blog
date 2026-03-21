import type { FileData } from "@/types";

export interface CalendarData {
    id: string;
    year: number;
    title: string;
    icon: string;
    color: string;
    description: string;
    fileId: string;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
    file: FileData;
}