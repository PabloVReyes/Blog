import type { FileData } from "@/types";

export interface SystemData {
    id: string;
    acronym: string | null;
    name: string;
    description: string;
    color: string;
    icon: string;
    url: string;
    type: "page" | "file";
    fileId: null | string;
    createdAt: Date;
    updatedAt: Date;
    file: FileData;
}
