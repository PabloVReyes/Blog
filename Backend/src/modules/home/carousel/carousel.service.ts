import { getPagination } from "../../../utils/pagination"
import * as repo from "./carousel.repository"
import { GetCarouselSchema } from "./carousel.schema"
import { sanitizeFileName } from "../../../utils/file"
import { CarouselCreateDto, CarouselUpdateDto } from "./carousel.types"
import * as path from "path"

////////////
// CREATE //
////////////

export const postCarouselService = async (dto: CarouselCreateDto) => {
    const { title, description, sectionId, type, url, isActive, imageFile, contentFile } = dto

    if (type === "file" && !contentFile) {
        throw new Error("El archivo PDF es requerido");
    }

    const props = {
        isActive: isActive,
        title,
        description,
        sectionId,
        type,

        imageName: imageFile
            ? sanitizeFileName(imageFile.originalname)
            : null,

        imageUrl: imageFile
            ? `/uploads/${imageFile.filename}`
            : null,

        imagePath:
            imageFile?.path ?? null,

        url: type === 'page' ? url ?? null : null,

        file:
            type === "file" && contentFile
                ? {
                    name: sanitizeFileName(contentFile.originalname),
                    path: contentFile.filename,
                    size: contentFile.size,
                    mimeType: contentFile.mimetype
                }
                : null
    };

    await repo.postCarouselRepository(props)

    return true
}

//////////
// READ //
//////////

export const getCarouselService = async (dto: GetCarouselSchema) => {
    const { page, limit, search, isActive } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getCarouselRepository({
        skip,
        take,
        search,
        isActive
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: (page && limit) && limit * (page - 1) + 1,
            lastItem: (page && limit) && Math.min(total, limit * page)
        }
    }
}

export const downloadCarouselFileService = async (id: string) => {
    const file = await repo.getCarouselByIdRepository(id)
    if (!file?.file || !file.file.path) {
        throw new Error("Archivo no encontrado");
    }

    return {
        filePath: file.file.path,
        fileName: file.file.name
    }
}

////////////
// UPDATE //
////////////

export const putCarouselService = async (id: string, dto: CarouselUpdateDto) => {
    const { title, description, type, url, isActive, imageFile, contentFile } = dto;

    const existingItem = await repo.getCarouselByIdRepository(id);

    if (!existingItem) {
        throw new Error("El elemento no existe");
    }

    if (type === "file" && !contentFile && !existingItem.fileId) {
        throw new Error("El archivo es requerido");
    }

    const props = {
        id,
        isActive,
        title,
        description,
        type,

        image: imageFile
            ? {
                name: sanitizeFileName(imageFile.originalname),
                path: imageFile.path,
                url: `/uploads/${imageFile.filename}`
            }
            : undefined,

        url: type === "page" ? url ?? null : null,

        file:
            type === "file" && contentFile
                ? {
                    name: sanitizeFileName(contentFile.originalname),
                    path: contentFile.filename,
                    size: contentFile.size,
                    mimeType: contentFile.mimetype
                }
                : null
    };

    return await repo.putCarouselRepository(props);
};

////////////
// DELETE //
////////////

export const deleteCarouselService = async (id: string) => {
    const carousel: any = await repo.getCarouselByIdRepository(id)

    if (!carousel) {
        throw new Error("Carousel no encontrado")
    }

    await repo.deleteCarouselRepository(id)

    return true
}

// 195 lineas