export interface MonthlyReports {
    id: string;
    title: string;
    description: string;
    type: string;
    month: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    periodId: string;
    createdAt: Date;
    updatedAt: Date;
    period: Period;
}

export interface Period {
    id: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MonthyReportsFilters {
    page?: number;
    limit?: number;
    search?: number;
}
