import { database } from "../../../config/prisma"
import { GetCarouselProps, PostCarouselProps } from "./carousel.types"

/////////////
// CREATED //
/////////////

export const postCarouselRepository = async ({
    sectionId,
    isActive,
    imageName,
    imageUrl,
    imagePath,
    title,
    description,
    type,
    url,
    fileName,
    storedName,
    filePath,
    fileSize,
    mimeType
}: PostCarouselProps) => {
    try {
        const lastItem = await database.carouselItem.findFirst({
            where: { sectionId },
            orderBy: { orderIndex: "desc" }
        });

        await database.carouselItem.create({
            data: {
                isActive,
                type,
                imageName,
                imageUrl,
                title,
                description,
                sectionId,
                imagePath,

                // si es página
                url: type === "page" ? url : null,

                // si es archivo
                fileName: type === "file" ? fileName : null,
                storedName: type === "file" ? storedName : null,
                filePath: type === "file" ? filePath : null,
                fileSize: type === "file" ? fileSize : null,
                mimeType: type === "file" ? mimeType : null,

                orderIndex: lastItem ? lastItem.orderIndex + 1 : 0
            }
        });

        return true;
    } catch (error) {
        console.error("error en postCarouselRepository", error);
        throw new Error("Error al crear el elemento del carrusel");
    }
};

///////////
// READ  //
///////////

export const getCarouselRepository = async ({ isActive, take, skip, search }: GetCarouselProps) => {
    try {

        const where = {
            ...(isActive !== undefined && { isActive }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.carouselItem.findMany({
                where,
                orderBy: { orderIndex: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.carouselItem.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("error en getCarouselRepository")
        throw new Error("Error al obtener elementos del carousel")
    }
}

export const getCarouselByIdRepository = async (id: string) => {
    try {
        return await database.carouselItem.findUnique({ where: { id } })
    } catch (error) {
        console.error("error en getCarouselByIdRepository", error)
        throw new Error("Error al obtener carousel")
    }
}

////////////
// UPDATE //
////////////

interface PutCarouselRepositoryProps {
    isActive: boolean;
    id: string;
    imageName: string;
    imageUrl: string;
    title: string;
    description: string;
    type: string;
    imagePath: string | null;
    url: string | null;

    fileName: string | null;
    storedName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const putCarouselRepository = async ({
    isActive,
    id,
    imageName,
    imageUrl,
    title,
    description,
    type,
    url,
    fileName,
    storedName,
    filePath,
    fileSize,
    mimeType,
    imagePath
}: PutCarouselRepositoryProps) => {
    try {
        return await database.carouselItem.update({
            where: {
                id
            },
            data: {
                isActive,
                type,
                imageName,
                imageUrl,
                title,
                description,
                imagePath,

                // si es página
                url: type === "page" ? url : null,

                // si es archivo
                fileName: type === "file" ? fileName : null,
                storedName: type === "file" ? storedName : null,
                filePath: type === "file" ? filePath : null,
                fileSize: type === "file" ? fileSize : null,
                mimeType: type === "file" ? mimeType : null,
            }
        })

    } catch (error) {
        console.error("error en putCarouselRepository", error)
        throw new Error("Error en putCarouselRepository")
    }
}

////////////
// DELETE //
////////////

export const deleteCarouselRepository = async (id: string) => {
    try {
        return await database.carouselItem.delete({
            where: { id }
        })

    } catch (error) {
        console.error("error en deteleCarouselRepository", error)
        throw new Error("Error al eliminar el elemento del carrusel")
    }
}
