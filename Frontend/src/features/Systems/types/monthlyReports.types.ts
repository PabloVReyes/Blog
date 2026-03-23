import type { FileData } from "@/types";

export interface MonthlyReportsData {
    id: string;
    title: string;
    description: string;
    type: string;
    month: number;
    fileId: string;
    periodId: string;
    createdAt: Date;
    updatedAt: Date;
    period: Period;
    file: FileData | null;
}

export interface Period {
    id: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}
