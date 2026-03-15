import { database } from "../../../config/prisma";
import { PaginationProps } from "../../../types/pagination";

////////////
// CREATE //
////////////

interface PostCycleRepositoryProps {
    name: string;
}

export const postCycleRepository = async ({ name }: PostCycleRepositoryProps) => {
    try {
        return await database.cycle.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("Error en postCycleRepository")
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

            // Desplazar índices dentro del mismo ciclo
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

            // Crear registro
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
        console.error("error en postGpcRepository")
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
        console.error("Error en getCycleRepository")
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
                OR: [
                    { name: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.cycle.findMany({
                where,
                orderBy: {
                    name: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    _count: {
                        select: {
                            gpcs: true
                        }
                    },
                    gpcs: true
                }
            }),
            database.cycle.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCycleWithGpcRepository")
        throw new Error("Error al obtener ciclos con algoritmos")
    }
}

export const getGpcRepository = async ({ search, take, skip }: PaginationProps) => {
    try {
        const where = {
            ...(search && {
                OR: [
                    { title: { contains: search } },
                ],
            }),
        }

        const [data, total] = await Promise.all([
            database.gpc.findMany({
                where,
                orderBy: {
                    id: "asc",
                },
                ...(take !== undefined && { take }),
                ...(skip !== undefined && { skip }),
                include: {
                    cycle: true
                }
            }),
            database.gpc.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getGpcRepository")
        throw new Error("Error al obtener repositorios")
    }
}

export const getGpcByIdRepositoy = async (id: string) => {
    try {
        return await database.gpc.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getGpuByIdRepositoy")
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
            include: {
                cycle: true
            }
        })
    } catch (error) {
        console.error("Error en putGpcRepository")
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
        console.error("Error en deleteGpcRepository")
        throw new Error("Error al eliminar algoritmo")
    }
}