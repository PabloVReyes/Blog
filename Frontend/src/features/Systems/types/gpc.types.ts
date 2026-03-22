import type { FileData } from "@/types";

export interface GPCData {
    id: string;
    orderIndex: number;
    title: string;
    description: string;
    fileId: string;
    cycleId: string;
    cycle: Cycle;
    file: FileData | null;
}

export interface Cycle {
    id: string;
    name: string;
}