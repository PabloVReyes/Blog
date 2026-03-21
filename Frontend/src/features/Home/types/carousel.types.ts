export interface CarouselData {
    id: string;
    imageName: string;
    imageUrl: string;
    imagePath: string;
    type: "page" | "file" | "null";
    title: string;
    description: string;
    orderIndex: number;
    isActive: boolean;
    url: string | null;
    fileId: string;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
    file: File;
}

export interface File {
    id: string;
    name: string | null;
    path: string | null;
    size: number | null;
    mimeType: string | null;
    url: string | null;
    provider: null;
    createdAt: Date;
}
