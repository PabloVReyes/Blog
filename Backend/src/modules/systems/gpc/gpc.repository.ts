import { database } from "@/config/prisma";
import { PaginationProps } from "@/types/pagination";

////////////
// CREATE //
////////////

interface PostCicleRepositoryProps {
    name: string;
}

export const postCicleRepository = async ({ name }: PostCicleRepositoryProps) => {
    try {
        return await database.cicle.create({
            data: {
                name
            }
        })
    } catch (error) {
        console.error("Error en postCicleRepository")
        throw new Error("Error al crear ciclo")
    }
}

interface PostGpcRepositoryProps {
    title: string;
    description: string;
    cicle: string;
    orderIndex: number
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
}

export const postGpcRepository = async ({
    title,
    description,
    cicle,
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
                    cicleId: cicle,
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
                    cicleId: cicle,
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

export const getCicleRepository = async () => {
    try {
        const [data, total] = await Promise.all([
            database.cicle.findMany({
                orderBy: { name: "asc" }
            }),
            database.cicle.count(),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCicleRepository")
        throw new Error("Error al obtener los ciclos")
    }
}

export const getCicleWithGpcRepository = async ({ search, take, skip }: PaginationProps) => {
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
            database.cicle.findMany({
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
            database.cicle.count({ where }),
        ])

        return { data, total }
    } catch (error) {
        console.error("Error en getCicleWithGpcRepository")
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
                    cicle: true
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
    cicle,
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
                cicleId: cicle,
                fileName,
                filePath,
                fileSize,
                mimeType
            },
            include: {
                cicle: true
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