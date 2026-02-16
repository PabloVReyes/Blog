import { PostCarouselSchema, PutCarouselSchema } from "./carousel.schema";

export interface GetCarouselProps {
    isActive?: boolean;
    take?: number;
    skip?: number;
    search?: string;
}

export interface CarouselFileDto {
    imageFile?: Express.Multer.File;
    contentFile?: Express.Multer.File;
}

export interface CarouselCreateDto extends PostCarouselSchema, CarouselFileDto { }

export interface PostCarouselProps {
    isActive: boolean
    sectionId: string;
    imageName: string;
    imageUrl: string;
    imagePath: string;
    title: string;
    description: string;
    type: string;

    url: string | null;

    fileName: string | null;
    storedName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export interface CarouselUpdateDto extends PutCarouselSchema, CarouselFileDto {}