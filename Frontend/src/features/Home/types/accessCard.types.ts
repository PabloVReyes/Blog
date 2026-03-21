import type { FileData } from "@/types";

export interface AccessCardData {
    id: string;
    title: string;
    badge: null;
    color: string;
    description: string;
    icon: string;
    url: null | string;
    type: "page" | "file";
    fileId: null | string;
    orderIndex: number;
    isActive: boolean;
    sectionId: string;
    file: FileData
}
