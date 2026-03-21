import { database } from "../../../config/prisma"
import { GetCarouselProps, PostCarouselProps } from "./carousel.types"

////////////
// CREATE //
////////////

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
    file
}: PostCarouselProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const lastItem = await tx.carouselItem.findFirst({
                where: { sectionId },
                orderBy: { orderIndex: "desc" }
            });

            let fileId: string | null = null;

            if (type === "file" && file) {
                const createdFile = await tx.file.create({
                    data: {
                        name: file.name,
                        path: file.path,
                        size: file.size,
                        mimeType: file.mimeType
                    }
                });
                fileId = createdFile.id;
            }

            return await tx.carouselItem.create({
                data: {
                    isActive,
                    type,
                    imageName,
                    imageUrl,
                    imagePath,
                    title,
                    description,
                    sectionId,
                    url: type === "page" ? url : null,
                    fileId,
                    orderIndex: lastItem
                        ? lastItem.orderIndex + 1
                        : 0
                }
            });
        });
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
                include: {
                    file: true
                }
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
        return await database.carouselItem.findUnique({
            where: { id },
            include: {
                file: true
            }
        })
    } catch (error) {
        console.error("error en getCarouselByIdRepository", error)
        throw new Error("Error al obtener carousel")
    }
}

////////////
// UPDATE //
////////////

type PutCarouselRepositoryProps = {
    id: string;
    isActive: boolean;
    title?: string;
    description?: string;
    type: string;
    url?: string | null;

    imageName?: string | null;
    imageUrl?: string | null;
    imagePath?: string | null;

    file?: {
        name?: string;
        path: string;
        size?: number;
        mimeType?: string;
    } | null;
};

export const putCarouselRepository = async ({
    isActive,
    id,
    imageName,
    imageUrl,
    title,
    description,
    type,
    url,
    file,
    imagePath
}: PutCarouselRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const currentItem = await tx.carouselItem.findUnique({
                where: { id },
                include: { file: true }
            });

            if (!currentItem) {
                throw new Error("CarouselItem no encontrado");
            }

            let fileId: string | null = currentItem.fileId;

            if (type === "file") {
                if (file) {
                    const newFile = await tx.file.create({
                        data: {
                            name: file.name,
                            path: file.path,
                            size: file.size,
                            mimeType: file.mimeType
                        }
                    });
                    fileId = newFile.id;
                }
            } else {
                fileId = null;
            }

            return await tx.carouselItem.update({
                where: { id },
                data: {
                    isActive,
                    title,
                    description,
                    type,

                    imageName,
                    imageUrl,
                    imagePath,
                    url: type === "page" ? url : null,
                    fileId
                },
                include: {
                    file: true
                }
            });
        });

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
        console.error("error en deleteCarouselRepository", error)
        throw new Error("Error al eliminar el elemento del carrusel")
    }
}
