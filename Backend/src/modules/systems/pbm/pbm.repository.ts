import { database } from "../../../config/prisma"
import { PaginationProps } from "../../../types/pagination";
import { logger } from "../../../utils/logger";
import * as path from "path"
import * as fs from "fs/promises"

////////////
// CREATE //
////////////

interface PostPbmReporisoryProps {
    title: string;
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postPbmRepository = async ({ title, file }: PostPbmReporisoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.pbm.create({
                data: {
                    title,
                    fileId
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postPbmRepository",
                entity: "PBM",
            },
            "Error al crear algoritmo"
        )
        throw new Error("Error al crear algoritmo")
    }
}

//////////
// READ //
//////////

export const getPBMRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { title: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.pbm.findMany({
                where,
                orderBy: {
                    id: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    file: true
                }
            }),
            database.pbm.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getPBMRepository",
                entity: "PBM",
                params: { search, take, skip }
            },
            "Error al obtener algoritmos"
        )
        throw new Error("Error al obtener algoritmos")
    }
}

export const getPBMByIdRepository = async (id: string) => {
    try {
        return await database.pbm.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getPBMByIdRepository",
                entity: "PBM",
                id
            },
            "Error al obtener el algoritmo"
        )
        throw new Error("Error al obtener el algoritmo")
    }
}

////////////
// UPDATE //
////////////

interface PutPBMRepositoryProps extends PostPbmReporisoryProps {
    id: string;
}

export const putPBMRepository = async ({ id, title, file }: PutPBMRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.pbm.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Algoritmo PBM no encontrado")
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

            return await tx.pbm.update({
                where: { id },
                data: {
                    title,
                    fileId
                },
                include: {
                    file: true
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putPBMRepository",
                entity: "PBM",
            },
            "Error al actualizar el algoritmo"
        )
        throw new Error("Error al actualizar el algoritmo")
    }
}

////////////
// DELETE //
////////////

export const deletePBMRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.pbm.findUnique({
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

            return await tx.pbm.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deletePBMRepository",
                entity: "PBM",
                id
            },
            "Error al eliminar algoritmo"
        )
        throw new Error("Error al eliminar algoritmo")
    }
}