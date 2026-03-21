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
    imageName?: string | null;
    imageUrl?: string | null;
    imagePath?: string | null;
    title: string;
    description: string;
    type: string;

    url: string | null;

    file?: {
        name?: string;
        path: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export interface CarouselUpdateDto extends PutCarouselSchema, CarouselFileDto { }