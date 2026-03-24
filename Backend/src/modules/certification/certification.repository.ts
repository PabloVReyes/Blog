import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";
import * as path from "path"
import * as fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostCertificationRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    sectionId: number
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
}

export const postCertificationRepository = async ({
    name,
    description,
    isNew,
    sectionId,
    file
}: PostCertificationRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null;

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.certification.create({
                data: {
                    name,
                    description,
                    isNew,
                    sectionId,
                    fileId
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCertificationRepository",
                entity: "Certification",
            },
            "Error creating certification"
        )
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
        logger.error(
            {
                error,
                operation: "postSectionRepository",
                entity: "CertificationSection",
                input: { name }
            },
            "Error creating section"
        )
        throw new Error("Error al crear sección")
    }
}

//////////
// READ //
//////////

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
                    certifications: {
                        include: {
                            file: true
                        }
                    }
                }
            }),
            database.certificationSection.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getSectionsWithCertificationsRepository",
                entity: "CertificationSection",
                input: { skip, take, search }
            },
            "Error fetching sections with certifications"
        )
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
        logger.error(
            {
                error,
                operation: "getSectionsRepository",
                entity: "CertificationSection"
            },
            "Error fetching sections"
        )
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
                    section: true,
                    file: true
                }
            }),
            database.certification.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCertificationsRepository",
                entity: "Certification",
                input: { skip, take, search }
            },
            "Error fetching certifications"
        )
        throw new Error("Error al obtener certificaciones")
    }
}

export const getCertificationByIdRepository = async (id: number) => {
    try {
        return await database.certification.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCertificationByIdRepository",
                entity: "Certification",
                input: { id }
            },
            "Error fetching certification by id"
        )
        throw new Error("Error al obtener certificación")
    }
}

////////////
// UPDATE //
////////////

interface PutCertificationRepositoryProps extends PostCertificationRepositoryProps {
    id: number
}

export const putCertificationRepository = async ({
    id,
    name,
    description,
    isNew,
    sectionId,
    file
}: PutCertificationRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.certification.findUnique({
                where: { id },
                include: {
                    file: true
                }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
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

            return await tx.certification.update({
                where: { id },
                data: {
                    name,
                    description,
                    isNew,
                    sectionId,
                    fileId
                },
                include: {
                    section: true,
                    file: true
                }
            })

        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putCertificationRepository",
                entity: "Certification",
            },
            "Error updating certification"
        )
        throw new Error("Error al actualizar certificación")
    }
}

////////////
// DELETE //
////////////

export const deleteCertificationRepository = async (id: number) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.certification.findUnique({
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

            return await tx.certification.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteCertificationRepository",
                entity: "Certification",
                input: { id }
            },
            "Error deleting certification"
        )
        throw new Error("Error al eliminar certificación")
    }
}