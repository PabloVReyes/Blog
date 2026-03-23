import type { FileData } from "@/types";

export interface PMBData {
    id: string;
    title: string;
    fileId: string;
    file: FileData | null;
}