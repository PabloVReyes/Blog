import { database } from "../../config/prisma";
import { PaginationProps } from "../../types/pagination";
import * as path from "path"
import * as fs from "fs/promises"

////////////
// CREATE //
////////////
interface PostSystemRepositoryProps {
    acronym?: string | null;
    name?: string | null;
    description: string;
    color: string;
    icon: string;
    type: string;

    url: string | null;

    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null;
}

export const postSystemRepository = async ({ acronym, name, description, color, icon, url, file, type }: PostSystemRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            let fileId: string | null = null

            if (type == "file" && file) {
                const createFile = await tx.file.create({
                    data: file
                })

                fileId = createFile.id
            }

            return await tx.systems.create({
                data: {
                    acronym,
                    name,
                    description,
                    color,
                    icon,
                    url,
                    type,
                    fileId
                }
            })
        })

    } catch (error) {
        console.error("Error en PostSystemRepositoryProps", error)
        throw new Error("Error al crear el sistema")
    }
}

//////////
// READ //
//////////

export const getSystemRepository = async ({ search, take, skip }: PaginationProps) => {
    const where = {
        ...(search && {
            OR: [
                { acronym: { contains: search } },
                { name: { contains: search } },
                { description: { contains: search } },
            ],
        }),
    }

    const [data, total] = await Promise.all([
        database.systems.findMany({
            where,
            orderBy: { createdAt: "asc" },
            ...(take !== undefined && { take }),
            ...(skip !== undefined && { skip }),
            include: { file: true }
        }),
        database.systems.count({ where }),
    ])

    return { data, total }
}

export const getSystemByIdRepository = async (id: string) => {
    try {
        return await database.systems.findUnique({ where: { id } })
    } catch (error) {
        console.error("Error en getSystemByIdRepository", error)
        throw new Error("Error al obtener el sistema")
    }
}

////////////
// UPDATE //
////////////
interface PutSystemRepositoryProps {
    id: string;
    acronym?: string | null;
    name?: string | null;
    description: string;
    color: string;
    icon: string;
    type: string;

    url: string | null;

    file?: {
        name?: string;
        path?: string;
        size?: number;
        mimeType?: string;
    } | null
}

export const putSystemRepository = async ({ id, acronym, name, description, color, icon, url, type, file }: PutSystemRepositoryProps) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.systems.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Sistema no encontrado")
            }

            let fileId = current.fileId

            const uploadsPath = path.join(process.cwd(), 'uploads');
            if (type === "file") {
                if (file) {
                    if (current.file?.path) {
                        try {
                            const absolutePath = path.join(uploadsPath, current.file.path)
                            await fs.unlink(absolutePath)
                        } catch (error) {
                            console.warn("No se pudo eliminar archivo físico:", error)
                        }

                        await tx.file.delete({
                            where: { id: current.file.id }
                        })
                    }

                    const newFile = await tx.file.create({
                        data: file
                    })

                    fileId = newFile.id
                }
            } else {
                if (current.file?.path) {
                    try {
                        await fs.unlink(path.join(uploadsPath, current.file.path));
                    } catch (e) {
                        console.warn("No se pudo eliminar archivo:", e);
                    }

                    await tx.file.delete({
                        where: { id: current.file.id }
                    });
                }

                fileId = null
            }

            return await tx.systems.update({
                where: { id },
                data: {
                    acronym,
                    name,
                    description,
                    color,
                    icon,
                    url: type === "page" ? url : null,
                    type,
                    fileId
                },
                include: {
                    file: true
                }
            })
        })
    } catch (error) {
        console.error("error en putSystemRepository", error)
        throw new Error("Error al actualizar el sistema")
    }
}

////////////
// DELETE //
////////////

export const deleteSystemRepository = async (id: string) => {
    try {
        return await database.$transaction(async (tx) => {
            const current = await tx.systems.findUnique({
                where: { id },
                include: { file: true }
            })

            if (!current) {
                throw new Error("Carousel no encontrado")
            }

            const uploadsPath = path.join(process.cwd(), 'uploads')

            if (current.file?.path) {
                try {
                    await fs.unlink(path.join(uploadsPath, current.file.path))
                } catch (error) {
                    console.warn("No se pudo eliminar archivo:", error)
                }

                await tx.file.delete({
                    where: { id: current.file.id }
                })
            }

            return await tx.systems.delete({
                where: { id }
            })
        })
        
    } catch (error) {
        console.error("Error en deleteSystemRepository", error)
        throw new Error("Error al eliminar sistema")
    }
}