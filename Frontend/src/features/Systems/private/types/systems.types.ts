export interface Systems {
    id: string;
    acronym: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    url: string;
    type: string;
    fileName: null | string;
    storedName: null | string;
    filePath: null | string;
    fileSize: null | string;
    mimeType: null | string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SystemsFilters {
    page?: number;
    limit?: number;
    search?: string;
}
