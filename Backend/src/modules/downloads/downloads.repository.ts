import { database } from "../../config/prisma"
import * as schema from "./downloads.schema"
import { PaginationProps } from "../../types/pagination"
import { logger } from "../../utils/logger";
import path from "path"
import fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostDownloadRepositoryProps {
    name: string;
    description?: string | null,
    isNew: boolean;
    type: "DOCUMENT" | "IMAGE"
    categoryId: string;
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
}

export const postDownloadRepository = async ({
    name,
    description,
    isNew,
    type,
    categoryId,
    file
}: PostDownloadRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.downloadFile.create({
                data: {
                    name,
                    description,
                    isNew,
                    type,
                    categoryId,
                    fileId
                }
            })
        })
    } catch (error) {
        logger.error({
            error,
            operation: "postDownloadRepository",
            entity: "DownloadFile",
        }, "Error creating download")
        throw new Error("Error al crear la descarga")
    }
}

interface PostAreaRepositoryProps extends schema.PostAreaSchema {
    slug: string
}

export const postAreaRepository = async ({ name, icon, color, slug }: PostAreaRepositoryProps) => {
    try {
        return await database.downloadArea.create({
            data: {
                name,
                icon,
                color,
                slug
            }
        })
    } catch (error) {
        logger.error({
            error,
            operation: "postAreaRepository",
            entity: "DownloadArea",
        }, "Error creating area")
        throw new Error("Error al crear el área")
    }
}

export const postSectionRepository = async ({ name, areaId }: { name: string, areaId: string }) => {
    try {
        return await database.downloadSection.create({
            data: {
                name,
                areaId
            }
        })
    } catch (error) {
        logger.error({
            error,
            operation: "postSectionRepository",
            entity: "DownloadSection",
        }, "Error creating section")
        throw new Error("Error al crear sección")
    }
}

export const postCategoryRepository = async ({ name, sectionId }: { name: string, sectionId: string }) => {
    try {
        return await database.downloadCategory.create({
            data: {
                name,
                sectionId
            }
        })
    } catch (error) {
        logger.error({
            error,
            operation: "postCategoryRepository",
            entity: "DownloadCategory",
        }, "Error creating category")
        throw new Error("Error al crear categoria")
    }
}

//////////
// READ //
//////////

export const getDownloadByIdRepository = async (id: string) => {
    try {
        return await database.downloadFile.findUnique({
            where: { id },
            include: {
                file: true
            }
        })
    } catch (error) {
        logger.error({
            error,
            operation: "getDownloadByIdRepository",
            entity: "DownloadFile",
            input: { id }
        }, "Error fetching download by id")
        throw new Error("Error al obtener información de descarga")
    }
}

export const getDownloadsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.downloadFile.findMany({
                where,
                orderBy: { createdAt: "asc" },
                include: {
                    file: true,
                    category: {
                        include: {
                            section: {
                                include: {
                                    area: true
                                }
                            }
                        }
                    }
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.downloadFile.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error({
            error,
            operation: "getDownloadsRepository",
            entity: "DownloadFile",
            input: { skip, take, search }
        }, "Error fetching downloads")
        throw new Error("Error al obtener las descargas")
    }
}

export const getAreasRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.downloadArea.findMany({
                where,
                orderBy: { createdAt: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.downloadArea.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error({
            error,
            operation: "getAreasRepository",
            entity: "DownloadArea",
            input: { skip, take, search }
        }, "Error fetching areas")
        throw new Error("Error al obtener las áreas")
    }
}

export const getAreaWithDownloadsRepository = async (slug: string) => {
    try {
        return await database.downloadArea.findFirst({
            where: {
                slug,
            },
            include: {
                sections: {
                    where: {
                        categories: {
                            some: {
                                files: {
                                    some: {
                                        isActive: true
                                    }
                                }
                            }
                        }
                    },
                    include: {
                        categories: {
                            where: {
                                files: {
                                    some: {
                                        isActive: true,
                                    },
                                }
                            },
                            include: {
                                files: {
                                    where: {
                                        isActive: true
                                    },
                                    include: {
                                        file: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        logger.error({
            error,
            operation: "getAreaWithDownloadsRepository",
            entity: "DownloadArea",
            input: { slug }
        }, "Error fetching area with downloads")
        throw new Error("Error al obtener area");
    }
};

export const getSectionByAreaRepository = async (areaId: string) => {
    try {
        const [data, total] = await Promise.all([
            database.downloadSection.findMany({
                where: {
                    areaId
                },
            }),
            database.downloadSection.count({
                where: {
                    areaId
                }
            })
        ])

        return { data, total }
    } catch (error) {
        logger.error({
            error,
            operation: "getSectionByAreaRepository",
            entity: "DownloadSection",
            input: { areaId }
        }, "Error fetching sections by area")
        throw new Error("Error al obtener secciones del area")
    }
}

export const getCategoriesBySectionRepository = async (sectionId: string) => {
    try {
        const [data, total] = await Promise.all([
            database.downloadCategory.findMany({
                where: {
                    sectionId
                }
            }),
            database.downloadCategory.count({
                where: {
                    sectionId
                }
            })
        ])

        return { data, total }
    } catch (error) {
        logger.error({
            error,
            operation: "getCategoriesBySectionRepository",
            entity: "DownloadCategory",
            input: { sectionId }
        }, "Error fetching categories by section")
        throw new Error("Error al obtener categorias de la sección")
    }
}

////////////
// UPDATE //
////////////

interface PutDownloadRepositoryProps extends PostDownloadRepositoryProps {
    id: string
}

export const putDownloadRepository = async ({
    id,
    name,
    description,
    type,
    isNew,
    categoryId,
    file
}: PutDownloadRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.downloadFile.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Descarga no encontrada")
            }

            let fileId = current.fileId
            const uploadsPath = path.join(process.cwd(), 'uploads');

            if (file) {
                if (current.file?.path) {
                    try {
                        const absolutePath = path.join(uploadsPath, current.file.path)
                        await fs.unlink(absolutePath)
                    } catch (_) { }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    })
                }

                const newFile = await tx.file.create({
                    data: file
                })

                fileId = newFile.id
            }

            return await tx.downloadFile.update({
                where: { id },
                data: {
                    name,
                    description,
                    isNew,
                    type,
                    categoryId,
                    fileId
                },
                include: {
                    category: {
                        include: {
                            section: {
                                include: {
                                    area: true
                                }
                            }
                        }
                    },
                    file: true
                },
            })
        })
    } catch (error) {
        logger.error({
            error,
            operation: "putDownloadRepository",
            entity: "DownloadFile",
        }, "Error updating download")
        throw new Error("Error al actualizar descarga")
    }
}

interface PutAreaRepositoryProps extends PostAreaRepositoryProps {
    id: string
}

export const putAreaRepository = async ({ id, name, icon, color, slug }: PutAreaRepositoryProps) => {
    try {
        return await database.downloadArea.update({
            where: {
                id
            },
            data: {
                name,
                icon,
                color,
                slug
            }
        })
    } catch (error) {
        logger.error({
            error,
            operation: "putAreaRepository",
            entity: "DownloadArea",
        }, "Error updating area")
        throw new Error("Error al actualizar el área")
    }
}

////////////
// DELETE //
////////////

export const deleteAreaRepository = async (id: string) => {
    try {
        return await database.downloadArea.delete({ where: { id } })
    } catch (error) {
        logger.error({
            error,
            operation: "deleteAreaRepository",
            entity: "DownloadArea",
            input: { id }
        }, "Error deleting area")
        throw new Error("Error al eliminar el área")
    }
}

export const deleteDownloadRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.downloadFile.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.file?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.file.path))
                } catch (_) { }

                await tx.file.delete({
                    where: { id: current.file.id }
                })
            }

            return await tx.downloadFile.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error({
            error,
            operation: "deleteDownloadRepository",
            entity: "DownloadFile",
            input: { id }
        }, "Error deleting download")
        throw new Error("Error al eliminar descarga")
    }
}