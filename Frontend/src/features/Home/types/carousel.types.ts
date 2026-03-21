import type { FileData } from "@/types";

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
    file: FileData;
}

export interface CarouselFilters {
    page?: number;
    limit?: number;
    search?: string;
}