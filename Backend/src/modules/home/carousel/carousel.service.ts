import { buildPaginationMeta, getPagination } from "../../../utils/pagination"
import * as repo from "./carousel.repository"
import { GetCarouselSchema } from "./carousel.schema"
import { sanitizeFileName } from "../../../utils/file"
import { CarouselCreateDto, CarouselUpdateDto } from "./carousel.types"
import { HttpError } from "../../../utils/httpError"

////////////
// CREATE //
////////////

export const postCarouselService = async (dto: CarouselCreateDto) => {
    const { title, description, sectionId, type, url, isActive, imageFile, contentFile } = dto

    if (type === "file" && !contentFile) {
        throw new HttpError(400, "El archivo es requerido");
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

    return await repo.postCarouselRepository(props)
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
        meta: buildPaginationMeta(total, page, limit)
    }
}

////////////
// UPDATE //
////////////

export const putCarouselService = async (id: string, dto: CarouselUpdateDto) => {
    const { title, description, type, url, isActive, imageFile, contentFile } = dto;

    const existingItem = await repo.getCarouselByIdRepository(id);

    if (!existingItem) {
        throw new HttpError(404, "El elemento no existe");
    }

    if (type === "file" && !contentFile && !existingItem.fileId) {
        throw new HttpError(400, "El archivo es requerido");
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
    const carousel = await repo.getCarouselByIdRepository(id)

    if (!carousel) {
        throw new HttpError(404, "Carousel no encontrado")
    }

    await repo.deleteCarouselRepository(id)

    return true
}

// 195 lineas