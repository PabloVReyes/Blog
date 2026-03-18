export interface Vacation {
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    type: string;
    shiftId: number;
    createdAt: Date;
    shift: Shift;
}

export interface Shift {
    id: number;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface VacationFilters {
    page?: number;
    limit?: number;
    search?: string;
}
