import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";
import { logger } from "../../utils/logger";
import * as path from "path"
import * as fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostJuristicsRepositoryProps {
    name: string;
    description?: string | null
    isNew: boolean;
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postJuristicsRepository = async ({
    name,
    description,
    isNew,
    file
}: PostJuristicsRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null;

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.juristics.create({
                data: {
                    name,
                    description,
                    isNew,
                    fileId
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postJuristicsRepository",
                entity: "Juristics"
            },
            "Error creating Juristics"
        )
        throw new Error("Error al crear disposición juridica")
    }
}

//////////
// READ //
//////////

export const getJuristicsRepository = async ({ skip, take, search }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.juristics.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                include: { file: true },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
            }),
            database.juristics.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getJuristicsRepository",
                entity: "Juristics"
            },
            "Error fetching Juristics"
        )
        throw new Error("Error al obtener las disposiciones juridicas")
    }
}

export const getJuristicsByIdRepository = async (id: number) => {
    try {
        return await database.juristics.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getJuristicsByIdRepository",
                entity: "Juristics"
            },
            "Error fetching Juristics By ID"
        )
        throw new Error("Error al obtener disposición juridica")
    }
}

////////////
// UPDATE //
////////////

export interface PutJuristicsRepositoryProps extends PostJuristicsRepositoryProps {
    id: number
}

export const putJuristicsRepository = async ({
    id,
    name,
    description,
    isNew,
    file
}: PutJuristicsRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.juristics.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Disposicion Juridica no encontrada")
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

            return await tx.juristics.update({
                where: { id },
                data: {
                    name,
                    description,
                    isNew,
                    fileId
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putJuristicsRepository",
                entity: "Juristics"
            },
            "Error updating Juristics"
        )
        throw new Error("Error al actualizar dispocisión juridica")
    }
}

////////////
// DELETE //
////////////

export const deleteJuristicsRepository = async (id: number) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.standards.findUnique({
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

            return await tx.standards.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteJuristicsRepository",
                entity: "Juristics"
            },
            "Error deleting Juristics"
        )
        throw new Error("Error al eliminar disposición juridica")
    }
}