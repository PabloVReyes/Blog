export interface ClinicalPracticeGuide {
    id: string;
    code: string;
    title: string;
    fileNameER: string;
    filePathER: string;
    fileSizeER: number;
    mimeTypeER: string;
    fileNameRR: string;
    filePathRR: string;
    fileSizeRR: number;
    mimeTypeRR: string;
    categoryId: string;
    category: Category;
}

export interface Category {
    id: string;
    name: string;
}

export interface ClinicalPracticeGuideFilters {
    page?: number;
    limit?: number;
    search?: string;
}