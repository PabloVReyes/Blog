export interface AccessCard {
    id: string;
    title: string;
    badge: null;
    color: string;
    description: string;
    icon: string;
    url: string;
    type: string;
    fileName: null;
    storedName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    orderIndex: number;
    isActive: boolean;
    sectionId: string;
}

export interface AccessCardFilters {
    page?: number;
    limit?: number;
    search?: string
}