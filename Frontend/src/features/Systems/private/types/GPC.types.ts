export interface GPC {
    id: string;
    orderIndex: number;
    title: string;
    description: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    cycleId: string;
    cycle: Cycle;
}

export interface Cycle {
    id: string;
    name: string;
}

export interface GPCFilters {
    page?: number;
    limit?: number;
    search?: string;
}