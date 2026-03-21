import { getPagination } from "../../../utils/pagination"
import * as repo from "./carousel.repository"
import { GetCarouselSchema } from "./carousel.schema"
import { sanitizeFileName } from "../../../utils/file"
import { CarouselCreateDto, CarouselUpdateDto } from "./carousel.types"

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
            ? `/uploads/carousel/images/${imageFile.filename}`
            : null,

        imagePath:
            imageFile?.path ?? null,

        url: type === 'page' ? url ?? null : null,

        file:
            type === "file" && contentFile
                ? {
                    name: sanitizeFileName(contentFile.originalname),
                    path: contentFile.path,
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

    if (existingItem.file && (type !== "file" || contentFile)) {
        try {
            if (existingItem.file.path) {
                const fs = await import("fs/promises");
                await fs.unlink(existingItem.file.path).catch(() => { });
            }
        } catch (error) {
            console.error("Error al eliminar archivo anterior", error)
            throw new Error("Error eliminando archivo anterior")
        }
    }

    if (existingItem.imagePath && imageFile) {
        try {
            const fs = await import("fs/promises");
            await fs.unlink(existingItem.imagePath).catch(() => { });
        } catch (error) {
            console.error("Error eliminando imagen anterior:", error);
        }
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

        imageName: imageFile
            ? sanitizeFileName(imageFile.originalname)
            : existingItem.imageName,

        imageUrl: imageFile
            ? `/uploads/carousel/images/${imageFile.filename}`
            : existingItem.imageUrl,

        imagePath: imageFile
            ? imageFile.path
            : existingItem.imagePath,

        url: type === "page" ? url ?? null : null,

        file:
            type === "file" && contentFile
                ? {
                    name: sanitizeFileName(contentFile.originalname),
                    path: contentFile.path,
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

    if (carousel.imagePath) {
        const fs = await import("fs/promises");
        await fs.unlink(carousel.imagePath).catch(() => { });
    }

    if (carousel.filePath) {
        const fs = await import("fs/promises");
        await fs.unlink(carousel.filePath).catch(() => { });
    }

    await repo.deleteCarouselRepository(id)

    return true
}

// 195 lineas