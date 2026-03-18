export interface Alert {
    id: string;
    imageName: string;
    imageUrl: string;
    imagePath: string;
    type: string;
    title: string;
    description: string;
    orderIndex: number;
    isActive: boolean;
    url: null;
    fileName: null;
    storedName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AlertFilters {
    page?: number;
    limit?: number;
    search?: string;
}
