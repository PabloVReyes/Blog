import type { FileData } from "@/types";

export interface AdverseEventsData {
    id: string;
    title: string;
    type: string;
    fileId: string;
    file: FileData | null;
}