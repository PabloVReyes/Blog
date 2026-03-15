import { database } from "../../config/prisma"
import * as schema from "./downloads.schema"
import { PaginationProps } from "../../types/pagination"

////////////
// CREATE //
////////////
interface PostDownloadRepositoryProps {
    name: string;
    description?: string | null,
    isNew: boolean;
    type: "DOCUMENT" | "IMAGE"
    categoryId: number
    fileName: string | null;
    filePath: string | null;
    fileSize: number | null;
    mimeType: string | null;
}

export const postDownloadRepository = async ({
    name,
    description,
    isNew,
    type,
    categoryId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostDownloadRepositoryProps) => {
    try {
        return await database.downloadFile.create({
            data: {
                name,
                description,
                isNew,
                type,
                categoryId,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en postDownloadRepository", error)
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
        console.error("Error en postAreaRepository")
        throw new Error("Error al crear el área")
    }
}

export const postSectionRepository = async ({ name, areaId }: { name: string, areaId: number }) => {
    try {
        return await database.downloadSection.create({
            data: {
                name,
                areaId
            }
        })
    } catch (error) {
        console.error("Error en postCategoryRepository", error)
        throw new Error("Error al crear sección")
    }
}

export const postCategoryRepository = async ({ name, sectionId }: { name: string, sectionId: number }) => {
    try {
        return await database.downloadCategory.create({
            data: {
                name,
                sectionId
            }
        })
    } catch (error) {
        console.error("Error en postCategoryRepository", error)
        throw new Error("Error al crear categoria")
    }
}

//////////
// READ //
//////////

export const getDownloadByIdRepository = async (id: number) => {
    try {
        return await database.downloadFile.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getDownloadByIdRepository")
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
        console.error("Error en getDownloadsRepository")
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
        console.error("Error en getAreasRepository")
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
                                        isActive: true
                                    }
                                }
                            },
                            include: {
                                files: {
                                    where: {
                                        isActive: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error en getAreaWithDownloadsRepository");
        throw new Error("Error al obtener area");
    }
};

export const getSectionByAreaRepository = async (areaId: number) => {
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
        console.error("Error en getCategoryByAreaRepository")
        throw new Error("Error al obtener secciones del area")
    }
}

export const getCategoriesBySectionRepository = async (sectionId: number) => {
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
        console.error("Error en getCategoriesBySectionRepository")
        throw new Error("Error al obtener categorias de la sección")
    }
}

interface PutDownloadRepositoryProps extends PostDownloadRepositoryProps {
    id: number
}

export const putDownloadRepository = async ({
    id,
    name,
    description,
    type,
    isNew,
    categoryId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutDownloadRepositoryProps) => {
    try {
        return await database.downloadFile.update({
            where: { id },
            data: {
                name,
                description,
                isNew,
                type,
                categoryId,
                fileName,
                filePath,
                fileSize,
                mimeType
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
                }
            },
        })
    } catch (error) {
        console.error("error en putDownloadRepository", error)
        throw new Error("Error al actualizar descarga")
    }
}
////////////
// UPDATE //
////////////

interface PutAreaRepositoryProps extends PostAreaRepositoryProps {
    id: number
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
        console.error("Error en putAreaRepository")
        throw new Error("Error al actualizar el área")
    }
}

////////////
// DELETE //
////////////

export const deleteAreaRepository = async (id: number) => {
    try {
        return await database.downloadArea.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteAreaRepository")
        throw new Error("Error al eliminar el área")
    }
}

export const deleteDownloadRepository = async (id: number) => {
    try {
        return await database.downloadFile.delete({ where: { id } })
    } catch (error) {
        console.error("Erro en deleteDownloadRepository")
        throw new Error("Error al eliminar descarga")
    }
}