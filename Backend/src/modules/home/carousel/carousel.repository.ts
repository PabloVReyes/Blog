import { database } from "../../../config/prisma"
import { logger } from "../../../utils/logger";
import { GetCarouselProps, PostCarouselProps } from "./carousel.types"
import fs from 'fs/promises'
import path from 'path'

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
        logger.error(
            {
                error,
                operation: "postCarouselRepository",
                entity: "Carousel",
                input: { sectionId, isActive, type, title }
            },
            "Error creating carousel item"
        );
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
        logger.error(
            {
                error,
                operation: "getCarouselRepository",
                entity: "Carousel",
                input: { isActive, take, skip, search }
            },
            "Error fetching carousel items"
        );
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
        logger.error(
            {
                error,
                operation: "getCarouselByIdRepository",
                entity: "Carousel",
                input: { id }
            },
            "Error fetching carousel by id"
        );
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

    image?: {
        name?: string | null;
        url?: string | null;
        path?: string | null;
    }

    file?: {
        name?: string;
        path: string;
        size?: number;
        mimeType?: string;
    } | null;
};

export const putCarouselRepository = async (props: PutCarouselRepositoryProps) => {
    const {
        id,
        isActive,
        title,
        description,
        type,
        url,
        file,
        image
    } = props;

    try {
        return await database.$transaction(async (tx) => {

            const current = await tx.carouselItem.findUnique({
                where: { id },
                include: { file: true }
            });

            if (!current) {
                throw new Error("CarouselItem no encontrado");
            }

            let fileId = current.fileId;
            let imagePath: any = current.imagePath;
            let imageName: any = current.imageName;
            let imageUrl: any = current.imageUrl;

            const uploadsPath = path.join(process.cwd(), 'uploads');

            if (type === "file") {
                if (file) {
                    if (current.file?.path) {
                        try {
                            await fs.unlink(path.join(uploadsPath, current.file.path));
                        } catch (error) {
                            logger.warn(
                                {
                                    error,
                                    operation: "putCarouselRepository",
                                    entity: "Carousel",
                                    input: { id }
                                },
                                "No se pudo eliminar archivo físico"
                            );
                        }

                        await tx.file.delete({
                            where: { id: current.file.id }
                        });
                    }

                    const newFile = await tx.file.create({
                        data: file
                    });

                    fileId = newFile.id;
                }

            } else {
                if (current.file?.path) {
                    try {
                        await fs.unlink(path.join(uploadsPath, current.file.path));
                    } catch (error) {
                        logger.warn(
                            {
                                error,
                                operation: "putCarouselRepository",
                                entity: "Carousel",
                                input: { id }
                            },
                            "No se pudo eliminar archivo físico"
                        );
                    }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    });
                }

                fileId = null;
            }

            if (image) {
                if (current.imagePath) {
                    try {
                        await fs.unlink(current.imagePath);
                    } catch (error) {
                        logger.warn(
                            {
                                error,
                                operation: "putCarouselRepository",
                                entity: "Carousel",
                                input: { id }
                            },
                            "No se pudo eliminar imagen"
                        );
                    }
                }

                imagePath = image.path;
                imageName = image.name;
                imageUrl = image.url;
            }

            return await tx.carouselItem.update({
                where: { id },
                data: {
                    isActive,
                    title,
                    description,
                    type,
                    url: type === "page" ? url : null,
                    fileId,
                    imagePath,
                    imageName,
                    imageUrl
                },
                include: {
                    file: true
                }
            });
        });

    } catch (error) {
        logger.error(
            {
                error,
                operation: "putCarouselRepository",
                entity: "Carousel",
                input: { id, type }
            },
            "Error updating carousel"
        );
        throw new Error("Error en putCarouselRepository")
    }
};

////////////
// DELETE //
////////////

export const deleteCarouselRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {

            const current = await tx.carouselItem.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Carousel no encontrado")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.imagePath) {
                try {
                    await fs.unlink(current.imagePath)
                } catch (error) {
                    logger.warn(
                        {
                            error,
                            operation: "deleteCarouselRepository",
                            entity: "Carousel",
                            input: { id }
                        },
                        "No se pudo eliminar imagen"
                    );
                }
            }

            if (current.file?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.file.path))
                } catch (error) {
                    logger.warn(
                        {
                            error,
                            operation: "deleteCarouselRepository",
                            entity: "Carousel",
                            input: { id }
                        },
                        "No se pudo eliminar archivo"
                    );
                }

                await tx.file.delete({
                    where: { id: current.file.id }
                })
            }

            return await tx.carouselItem.delete({
                where: { id }
            })
        })

    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteCarouselRepository",
                entity: "Carousel",
                input: { id }
            },
            "Error deleting carousel"
        );
        throw new Error("Error al eliminar el elemento del carrusel")
    }
}