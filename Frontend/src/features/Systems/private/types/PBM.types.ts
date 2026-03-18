export interface PBM {
    id: string;
    title: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
}

export interface PBMFilters {
    page?: number;
    limit?: number;
    search?: number;
}