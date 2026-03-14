import { getPagination } from "../../../utils/pagination"
import * as repo from "./carousel.repository"
import { GetCarouselSchema } from "./carousel.schema"
import { sanitizeFileName } from "../../../utils/file"
import { CarouselCreateDto, CarouselUpdateDto } from "./carousel.types"

/////////////
// CREATED //
/////////////

export const postCarouselService = async (dto: CarouselCreateDto) => {
    const { title, description, sectionId, type, url, isActive, imageFile, contentFile } = dto

    const contentType: 'page' | 'file' | 'null' =
        type === 'page' ? 'page' :
            type === 'file' ? 'file' :
                'null';

    if (type === "file" && !contentFile) {
        throw new Error("El archivo PDF es requerido");
    }

    const props = {
        isActive: isActive,
        title,
        description,
        sectionId,
        type: contentType,

        imageName: imageFile ? sanitizeFileName(imageFile.originalname) : null,
        imageUrl: imageFile ? `/uploads/carousel/images/${imageFile.filename}` : null,
        imagePath: imageFile?.path ?? null,

        url: contentType === 'page' ? url ?? null : null,
        fileName: contentFile?.originalname ? sanitizeFileName(contentFile.originalname) : null,
        storedName: contentFile?.filename ?? null,
        filePath: contentFile?.path ?? null,
        fileSize: contentFile?.size ?? null,
        mimeType: contentFile?.mimetype ?? null,
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

    if (!file || !file.storedName || !file.filePath) {
        throw new Error("Archivo no encontrado");
    }

    return {
        filePath: file.filePath,
        fileName: file.fileName
    }
}

////////////
// UPDATE //
////////////

export const putCarouselService = async (id: string, dto: CarouselUpdateDto) => {
    const { title, description, type, url, isActive, imageFile, contentFile } = dto;

    const existingItem: any = await repo.getCarouselByIdRepository(id);

    if (!existingItem) {
        throw new Error("El elemento no existe");
    }

    // 🔥 Si antes tenía archivo y ahora ya no será tipo file → eliminarlo
    if (existingItem.storedName && type !== "file") {
        try {
            if (existingItem.filePath) {
                const fs = await import("fs/promises");
                await fs.unlink(existingItem.filePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error eliminando archivo anterior:", error);
        }
    }

    // 🔥 Si es tipo file y subieron uno nuevo → eliminar el anterior
    if (existingItem.storedName && contentFile) {
        try {
            if (existingItem.filePath) {
                const fs = await import("fs/promises");
                await fs.unlink(existingItem.filePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error reemplazando archivo anterior:", error);
        }
    }

    // Actualizar la imagen si es que la suben
    if (existingItem.imagePath && imageFile) {
        try {
            if (existingItem.imagePath) {
                const fs = await import("fs/promises");
                await fs.unlink(existingItem.imagePath).catch(() => { });
            }
        } catch (error) {
            console.error("Error reemplazando archivo anterior:", error);
        }
    }

    // Validaciones según tipo
    if (type === "file" && !contentFile && !existingItem.storedName) {
        throw new Error("El archivo PDF es requerido");
    }

    // Construimos el objeto actualizado
    const props = {
        isActive,
        id,
        title,
        description,
        type,

        imageName: imageFile ? sanitizeFileName(imageFile.originalname) : existingItem.imageName,
        imageUrl: imageFile ? `/uploads/carousel/images/${imageFile.filename}` : existingItem.imageUrl,
        imagePath: imageFile ? imageFile.path : existingItem.imagePath,

        url: type === "page" ? url ?? null : null, // solo URL si es página
        fileName:
            type === "file"
                ? contentFile?.originalname
                    ? sanitizeFileName(contentFile.originalname)
                    : existingItem.fileName
                : null, // null si es "page" o "null"
        storedName: type === "file" ? contentFile?.filename ?? existingItem.storedName : null,
        filePath: type === "file" ? contentFile?.path ?? existingItem.filePath : null,
        fileSize: type === "file" ? contentFile?.size ?? existingItem.fileSize : null,
        mimeType: type === "file" ? contentFile?.mimetype ?? existingItem.mimeType : null,
    };

    const data = await repo.putCarouselRepository(props);

    return data;
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

