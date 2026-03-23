import type { FileData } from "@/types";

export interface ClinicalPracticeGuidelinesData {
    id: string;
    code: string;
    title: string;
    fileERId: string;
    fileRRId: string;
    categoryId: string;
    category: Category;
    fileER: FileData | null;
    fileRR: FileData | null;
}

export interface Category {
    id: string;
    name: string;
}
