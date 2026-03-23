import type { FileData } from "@/types";

export interface CareProtocolsData {
    id: string;
    title: string;
    description: string;
    fileId: string;
    categoryCareProtocolsId: string;
    category: Category;
    file: FileData | null;
}

export interface Category {
    id: string;
    name: string;
}