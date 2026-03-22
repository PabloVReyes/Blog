import { database } from "../../../config/prisma";
import { PaginationProps } from "../../../types/pagination";
import { logger } from "../../../utils/logger";

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
    fileName?: string | null;
    filePath?: string | null;
    fileSize?: number | null;
    mimeType?: string | null;
}

export const postGpcRepository = async ({
    title,
    description,
    cycle,
    orderIndex,
    fileName,
    filePath,
    fileSize,
    mimeType
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

            const gpc = await tx.gpc.create({
                data: {
                    title,
                    description,
                    cycleId: cycle,
                    orderIndex: newIndex,
                    fileName,
                    filePath,
                    fileSize,
                    mimeType
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
                orderBy: { name: "asc" }
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
                    gpcs: true
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
                include: { cycle: true }
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
    fileName,
    filePath,
    fileSize,
    mimeType
}: PutGpcRepositoryProps) => {
    try {
        return await database.gpc.update({
            where: { id },
            data: {
                title,
                description,
                cycleId: cycle,
                fileName,
                filePath,
                fileSize,
                mimeType
            },
            include: { cycle: true }
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
        return await database.gpc.delete({ where: { id } })
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