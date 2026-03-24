import type { FileData } from "@/types";

export interface CertificationData {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileId: string;
    sectionId: number;
    createdAt: Date;
    updatedAt: Date;
    section: Section;
    file: FileData | null;
}

export interface Section {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
