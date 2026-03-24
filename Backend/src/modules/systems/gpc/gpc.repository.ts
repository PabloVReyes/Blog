import path from "path"
import { database } from "../../../config/prisma";
import { PaginationProps } from "../../../types/pagination";
import { logger } from "../../../utils/logger";
import fs from "fs/promises";

////////////
// CREATE //
////////////

interface PostCycleRepositoryProps {
    name: string;
}

export const postCycleRepository = async ({ name }: PostCycleRepositoryProps) => {
    try {
        return await database.cycle.create({
            data: { name }
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postCycleRepository",
                entity: "Cycle",
                name
            },
            "Error al crear ciclo"
        )
        throw new Error("Error al crear ciclo")
    }
}

interface PostGpcRepositoryProps {
    title: string;
    description: string;
    cycle: string;
    orderIndex: number
    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postGpcRepository = async ({
    title,
    description,
    cycle,
    orderIndex,
    file
}: PostGpcRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {

            const newIndex = orderIndex

            await tx.gpc.updateMany({
                where: {
                    cycleId: cycle,
                    orderIndex: {
                        gte: newIndex,
                    },
                },
                data: {
                    orderIndex: {
                        increment: 1,
                    },
                },
            })

            let fileId: string | null = null

            if (file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            const gpc = await tx.gpc.create({
                data: {
                    title,
                    description,
                    cycleId: cycle,
                    orderIndex: newIndex,
                    fileId
                }
            })

            return gpc
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "postGpcRepository",
                entity: "GPC",
                cycle,
                orderIndex
            },
            "Error al crear algoritmo"
        )
        throw new Error("Error al crear algoritmo")
    }
}

//////////
// READ //
//////////

export const getCycleRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.cycle.findMany({
                orderBy: { name: "asc" },
            }),
            database.cycle.count(),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCycleRepository",
                entity: "Cycle"
            },
            "Error al obtener ciclos"
        )
        throw new Error("Error al obtener los ciclos")
    }
}

export const getCycleWithGpcRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            gpcs: {
                some: {}
            },
            ...(search && {
                OR: [{ name: { contains: search } }],
            }),
        }

        const [data, total] = await Promise.all([
            database.cycle.findMany({
                where,
                orderBy: { name: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: { select: { gpcs: true } },
                    gpcs: {
                        include: {
                            file: true
                        }
                    },
                }
            }),
            database.cycle.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getCycleWithGpcRepository",
                entity: "Cycle",
                search
            },
            "Error al obtener ciclos con algoritmos"
        )
        throw new Error("Error al obtener ciclos con algoritmos")
    }
}

export const getGpcRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [{ title: { contains: search } }],
            }),
        }

        const [data, total] = await Promise.all([
            database.gpc.findMany({
                where,
                orderBy: { id: "asc" },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    cycle: true,
                    file: true
                }
            }),
            database.gpc.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getGpcRepository",
                entity: "GPC",
                search
            },
            "Error al obtener algoritmos"
        )
        throw new Error("Error al obtener repositorios")
    }
}

export const getGpcByIdRepositoy = async (id: string) => {
    try {
        return await database.gpc.findUnique({ where: { id } })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "getGpcByIdRepository",
                entity: "GPC",
                id
            },
            "Error al obtener algoritmo por ID"
        )
        throw new Error("Error al obtener algoritmo")
    }
}

////////////
// UPDATE //
////////////

interface PutGpcRepositoryProps extends PostGpcRepositoryProps {
    id: string;
}

export const putGpcRepository = async ({
    id,
    title,
    description,
    cycle,
    file
}: PutGpcRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.gpc.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Altoritmo no encontrado")
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

            return await tx.gpc.update({
                where: { id },
                data: {
                    title,
                    description,
                    cycleId: cycle,
                    fileId
                },
                include: {
                    cycle: true,
                    file: true
                }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "putGpcRepository",
                entity: "GPC",
                id
            },
            "Error al actualizar algoritmo"
        )
        throw new Error("Error al actualizar el algoritmo")
    }
}

////////////
// DELETE //
////////////

export const deleteGpcRepository = async (id: string) => {
    try {
        return database.$transaction(async (tx) => {
            const current = await tx.gpc.findUnique({
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

            return await tx.gpc.delete({
                where: { id }
            })
        })
    } catch (error) {
        logger.error(
            {
                error,
                operation: "deleteGpcRepository",
                entity: "GPC",
                id
            },
            "Error al eliminar algoritmo"
        )
        throw new Error("Error al eliminar algoritmo")
    }
}