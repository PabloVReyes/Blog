import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";

///
// CREATE //
////


interface PostCertificationRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    sectionId: number
    fileName?: string | null;
    filePath?: string | null;
    fileSize?: number | null;
    mimeType?: string | null;
}

export const postCertificationRepository = async ({
    name,
    description,
    isNew,
    sectionId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PostCertificationRepositoryProps) => {
    try {
        return await database.certification.create({
            data: {
                name,
                description,
                isNew,
                sectionId,
                fileName,
                filePath,
                fileSize,
                mimeType
            }
        })
    } catch (error) {
        console.error("Error en PostCertificationRepositoryProps")
        throw new Error("Error al crear certificación")
    }
}

export const postSectionRepository = async (name: string) => {
    try {
        return await database.certificationSection.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("Error en postSectionRepository")
        throw new Error("Error al crear sección")
    }
}

//
// READ //
/////

export const getSectionsWithCertificationsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            certifications: {
                some: {}
            },
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.certificationSection.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: {
                            certifications: true
                        }
                    },
                    certifications: true
                }
            }),
            database.certificationSection.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCategoriesWithDownloadsRepository")
        throw new Error("Error al obtener las categorias con los archivos")
    }
}

export const getSectionsRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.certificationSection.findMany(),
            database.certificationSection.count()
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getSectionsRepository")
        throw new Error("Error al obtener las secciones")
    }
}

export const getCertificationsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.certification.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    section: true
                }
            }),
            database.certification.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCertificationsRepository")
        throw new Error("Error al obtener certificaciones")
    }
}

export const getCertificationByIdRepository = async (id: number) => {
    try {
        return await database.certification.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getCertificationByIdRepository")
        throw new Error("Error al obtener certificación")
    }
}

//
// UPDATE //
///

interface PutCertificationRepositoryProps extends PostCertificationRepositoryProps {
    id: number
}

export const putCertificationRepository = async ({
    id,
    name,
    description,
    isNew,
    sectionId,
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutCertificationRepositoryProps) => {
    try {
        return await database.certification.update({
            where: { id },
            data: {
                name,
                description,
                isNew,
                sectionId,
                fileName,
                filePath,
                fileSize,
                mimeType
            },
            include: {
                section: true
            }
        })
    } catch (error) {
        console.error("Error en putCertificationRepository")
        throw new Error("Error al actualizar certificación")
    }
}

///
// DELETE //
//

export const deleteCertificationRepository = async (id: number) => {
    try {
        return await database.certification.delete({ where: { id } })
    } catch (error) {
        console.error("Error en deleteCertificationRepository")
        throw new Error("Error al eliminar certificación")
    }
}