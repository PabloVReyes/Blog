import type { FileData } from "@/types";

export interface Systems {
    id: string;
    acronym: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    url: string;
    type: "page" | "file";
    file: FileData | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface SystemsFilters {
    page?: number;
    limit?: number;
    search?: string;
}
